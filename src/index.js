import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './stopwatch.css';

// TODO: To be used for upcoming update
// const TIME_FORMATS = [
//     "hh:mm:ss",
//     "h:m:s",
//     "mm:ss",
//     "m:s",
//     "ss",
//     "s",
// ];

class Stopwatch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            runningMinutes: 0,
            runningSeconds: 0,
            runningHours: 0,
            running: false,
        };

        const {
            buttonStyle,
            startButtonStyle,
            pauseButtonStyle,
            resetButtonStyle
        } = this.props;

        this.startBtnStyle = Object.assign({}, buttonStyle, startButtonStyle);
        this.pauseBtnStyle = Object.assign({}, buttonStyle, pauseButtonStyle);
        this.resetBtnStyle = Object.assign({}, buttonStyle, resetButtonStyle);
    }

    computeTime = () => {
        this.setState(prevState => {
            let { runningSeconds, runningMinutes, runningHours } = prevState;

            runningSeconds += 1;

            if (runningSeconds >= 60) {
                runningMinutes += 1;
                runningSeconds = 0;
            }

            if (runningMinutes >= 60) {
                runningHours += 1;
                runningMinutes = 0;
            }

            if (runningHours >= 24) {
                runningHours = 0;
            }

            this.props.onTimeChange({
                seconds: runningSeconds,
                minutes: runningMinutes,
                hours: runningHours,
            });

            return { runningSeconds, runningMinutes, runningHours };
        });
    }

    start = () => {
        this.setState(prevState => {
            if (!prevState.running) {
                this.timer = setInterval(this.computeTime, 1000);
                return { running: true };
            }
        });
    }

    pause = () => {
        this.setState({
            running: false,
        }, () => clearInterval(this.timer));
    }

    reset = () => {
        this.setState({
            running: false,
            runningSeconds: 0,
            runningMinutes: 0,
            runningHours: 0,
        }, () => clearInterval(this.timer));
    }

    formatNumber = (number) => number < 10 ? `0${number}` : `${number}`;

    renderFormatedTime = () => {
        return `${this.formatNumber(this.state.runningHours)} : ${this.formatNumber(this.state.runningMinutes)} : ${this.formatNumber(this.state.runningSeconds)}`;
    }

    render() {
        const {
            timeTextStyle, containerStyle, buttonClass, buttonContainerStyle,
            startButtonClass, pauseButtonClass, resetButtonClass,
            containerClass, timeTextClass, buttonContainerClass,
            startButtonText, pauseButtonText, resetButtonText,
        } = this.props;

        return (
            <div className={`container ${containerClass}`} style={containerStyle}>
                <div className={`time ${timeTextClass}`} style={timeTextStyle}>
                    {this.renderFormatedTime()}
                </div>
                <div className={`buttonWrapper ${buttonContainerClass}`} style={buttonContainerStyle}>
                    <button
                        style={this.startBtnStyle}
                        className={`btn btn-start ${buttonClass} ${startButtonClass}`}
                        onClick={this.start}>
                        {startButtonText}
                    </button>
                    <button
                        style={this.pauseBtnStyle}
                        className={`btn btn-stop ${buttonClass} ${pauseButtonClass}`}
                        onClick={this.pause}>
                        {pauseButtonText}
                    </button>
                    <button
                        style={this.resetBtnStyle}
                        className={`btn btn-reset ${buttonClass} ${resetButtonClass}`}
                        onClick={this.reset}>
                        {resetButtonText}
                    </button>
                </div>
            </div>
        );
    }
}

Stopwatch.propTypes = {
    timeTextStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonContainerStyle: PropTypes.object,
    startButtonStyle: PropTypes.object,
    pauseButtonStyle: PropTypes.object,
    resetButtonStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    buttonClass: PropTypes.string,
    startButtonClass: PropTypes.string,
    pauseButtonClass: PropTypes.string,
    resetButtonClass: PropTypes.string,
    containerClass: PropTypes.string,
    buttonContainerClass: PropTypes.string,
    timeTextClass: PropTypes.string,
    onTimeChange: PropTypes.func,
    startButtonText: PropTypes.string,
    pauseButtonText: PropTypes.string,
    resetButtonText: PropTypes.string,
    format: PropTypes.string,
}

Stopwatch.defaultProps = {
    timeTextStyle: {},
    buttonStyle: {},
    buttonContainerStyle: {},
    startButtonStyle: {},
    pauseButtonStyle: {},
    resetButtonStyle: {},
    containerStyle: {},
    buttonClass: "",
    startButtonClass: "",
    pauseButtonClass: "",
    resetButtonClass: "",
    containerClass: "",
    buttonContainerClass: "",
    timeTextClass: "",
    onTimeChange: () => {},
    startButtonText: "Start",
    pauseButtonText: "Pause",
    resetButtonText: "Reset",
};

export default Stopwatch;
