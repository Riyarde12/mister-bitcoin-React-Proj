import { Component } from "react";
import Chart from 'react-apexcharts';
import { bitcoinService } from '../services/bitcoinService.js';
import { Transactions } from "../components/charts/Transactions.jsx";
// import { createChart } from 'lightweight-charts';

export class StatisticPage extends Component {

    state = {
        marketPrice: null,
        transactions: null,
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                categories: [],
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        // chart: createChart()
    };

    componentDidMount() {
        this.loadMarketPrice();
        this.loadTransactions();
        // this.areaSeries();
    }

    loadMarketPrice = async () => {
        this.setState({ marketPrice: await bitcoinService.getMarketPrice() }, () => {
            this.statisticForDisplay();
        });
    };

    async loadTransactions() {
        this.setState({ transactions: await bitcoinService.getConfirmedTransactions() });
    };

    statisticForDisplay = () => {
        const { marketPrice, options, series } = this.state;
        let x = marketPrice.map(item => item.x);
        let y = marketPrice.map(item => item.y);
        console.log('x,y', x, y);
        this.setState({
            options: options.xaxis.categories = x,
            series: series[0].data = y
        });
    };

    // areaSeries = () => {
    //     const { chart } = this.state;

    //     const areaSeries = chart.addAreaSeries();
    //     areaSeries.setData([
    //         { time: '2018-12-22', value: 32.51 },
    //         { time: '2018-12-23', value: 31.11 },
    //         { time: '2018-12-24', value: 27.02 },
    //         { time: '2018-12-25', value: 27.32 },
    //         { time: '2018-12-26', value: 25.17 },
    //         { time: '2018-12-27', value: 28.89 },
    //         { time: '2018-12-28', value: 25.46 },
    //         { time: '2018-12-29', value: 23.92 },
    //         { time: '2018-12-30', value: 22.68 },
    //         { time: '2018-12-31', value: 22.67 },
    //     ]);
    //     this.setState({ chart: chart.addAreaSeries() });
    //     // return lineSeries;
    // };

    componentWillUnmount() { }

    render() {
        const { transactions, options } = this.state;
        if (!transactions && options) return <div>Loading...</div>;
        return (
            <section>
                <div> StatisticPage</div>
                <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
                <Transactions transactions={transactions} />
            </section>

        );
    }
}
