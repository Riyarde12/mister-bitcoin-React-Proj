import { storageService } from './storageService.js';
const axios = require('axios');
const STORAGE_KEY = 'bitcoin';
const MARKET_KEY = 'marketPrice';
const TRANSACTIONS_KEY = 'transactions';

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
};


async function getRate(coins) {
    try {
        let currency = storageService.load(STORAGE_KEY);
        // console.log('currency', currency);
        if (!currency) {
            const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1');
            // console.log('res (if)', res.data);
            storageService.store(STORAGE_KEY, res.data);
            currency = res.data;
            return currency;
        } else return currency;
    }
    catch (err) {
        console.log('Cannot get API req', err);
        throw err;
    }
}

async function getMarketPrice() {
    try {
        let marketPrice = storageService.load(MARKET_KEY);
        if (!marketPrice || !marketPrice.length) {
            const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true');
            storageService.store(MARKET_KEY, res.data.values);
            console.log('res.data.values', res.data.values);
            marketPrice = res.data.values;
            return marketPrice;
        } else return marketPrice;

    } catch (err) {
        console.log('Cannot get  marketPrice', err);
        throw err;
    }
}

async function getConfirmedTransactions() {
    try {
        let transactions = storageService.load(TRANSACTIONS_KEY);
        if (!transactions || !transactions.length) {
            const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true');
            storageService.store(TRANSACTIONS_KEY, res.data.values);
            console.log('res.data.values', res.data.values);
            transactions = res.data.values;
            return transactions;
        } else return transactions;

    } catch (err) {
        console.log('Cannot get  marketPrice', err);
        throw err;
    }

}