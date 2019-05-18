import Highcharts, { Options } from "highcharts";

export default class HighchartsTheme {
    static applyTheme() {
        var theme: Options = {
            //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            //    '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
                backgroundColor: '#323232'
            },
            title: {
                style: {
                    color: '#FFF',
                    font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                }
            },
            subtitle: {
                style: {
                    color: '#BBBBBB',
                    font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
                }
            },

            legend: {
                itemStyle: {
                    font: '9pt Trebuchet MS, Verdana, sans-serif',
                    color: 'black'
                },
                itemHoverStyle: {
                    color: 'gray'
                }
            }
        };

        // Apply the theme
        Highcharts.setOptions(theme);
    }
}