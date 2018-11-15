# Vacation Budget Optimization Problem

Your mission is to build a personalized vacation itinerary planner based on budget and number of days to inspire travelers to have memorable things to do.

As a Developer, you are responsible for building a tool for our itinerary planner.

## The DataSet

To test this, the product team has sent your team a [JSON file](./data.json) containing an array of activities, which have the following fields:

- id: integer the identifies the activity.
- duration: integer representing the duration of the activity in minutes. An activity duration is a multiple of 30, between 30 and 240.
- price: integer representing the cost of the activity is expressed as a integer number between 5 and 500.

## Constraints to observe

- Your program needs to allow input of a budget (integer between 100 and 5000) and number of days (integer between 1 and 5)
- The minimum budget allowed per day is 50. This means an input of 100 as budget, necessarily will need 1 or 2 days to be possible to calculate.
- A day has 12 hours. The first activity needs to start at 10:00 and the last needs to finish below 2200 (inclusive).
- There is a commute time between activities lasting 30 minutes, which means if you finish an activity at 11:30 you can only start another at 12:00. This commute time is only between activities, and does not affect the first activity.
- Activities are available to start every 30 minutes from 10:00.
- Your solution needs to have at least 3 activities per day, and all days from the input must be used.

## Input Parameters

Budget: The total budget for the vacation
Days: The number of days to be spent on the vacation

## Output Format

Your program needs to output JSON in the following format:

```json
{
  "schedule": {
    "summary": {
      "budget": 600,
      "days": 2,
      "budget_spent_per_days": [ 312, 266 ],
      "duration_per_day": [ 630, 660 ],
      "total_activities": 9
    },
    "days": [
      {
        "day": 1,
        "itinerary": [
          {
            "start": "10:00",
            "activity": {
              "id": 148,
              "duration": 60,
              "price": 17
            }
          },
          {
            "start": "11:30",
            "activity": {
              "id": 24,
              "duration": 210,
              "price": 21
            }
          },
          {
            "start": "15:30",
            "activity": {
              "id": 108,
              "duration": 240,
              "price": 106
            }
          },
          {
            "start": "20:00",
            "activity": {
              "id": 19,
              "duration": 30,
              "price": 168
            }
          }
        ]
      },
      {
        "day": 2,
        "itinerary": [
          {
            "start": "10:00",
            "activity": {
              "id": 87,
              "duration": 30,
              "price": 59
            }
          },
          {
            "start": "11:00",
            "activity": {
              "id": 56,
              "duration": 150,
              "price": 33
            }
          },
          {
            "start": "14:00",
            "activity": {
              "id": 18,
              "duration": 180,
              "price": 31
            }
          },
          {
            "start": "17:30",
            "activity": {
              "id": 47,
              "duration": 120,
              "price": 94
            }
          },
          {
            "start": "20:00",
            "activity": {
              "id": 66,
              "duration": 90,
              "price": 49
            }
          }
        ]
      }
    ]
  }
}
```
