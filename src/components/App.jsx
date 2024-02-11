import { Statistics } from './Statistics/Statistics';
import { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  handleFeedback = feedbackType => {
    this.setState(prevState => ({
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  positivePercentageFeedback = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();

    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  clearFeedback = () => {
    this.setState({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const options = ['good', 'neutral', 'bad'];
    const positivePercentage = this.positivePercentageFeedback();
    return (
      <>
        <Section title="Please leave a feedback" />
        <FeedbackOptions
          options={options}
          onLeaveFeedback={this.handleFeedback}
          clearFeedback={this.clearFeedback}
        />
        <Section />
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}
