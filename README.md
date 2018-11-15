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
      "balance": 0,
      "budget_spent_per_days": [
        137,
        463
      ],
      "duration_per_day": [
        450,
        630
      ],
      "total_activities": 7
    },
    "days": [
      {
        "day": 2,
        "itinerary": [
          {
            "start": "10:00",
            "startMinutes": 600,
            "activity": {
              "id": 52,
              "duration": 120,
              "price": 100
            }
          },
          {
            "start": "12:30",
            "startMinutes": 750,
            "activity": {
              "id": 116,
              "duration": 210,
              "price": 324
            }
          },
          {
            "start": "16:30",
            "startMinutes": 990,
            "activity": {
              "id": 695,
              "duration": 90,
              "price": 27
            }
          },
          {
            "start": "18:30",
            "startMinutes": 1110,
            "activity": {
              "id": 843,
              "duration": 90,
              "price": 12
            }
          }
        ]
      },
      {
        "day": 1,
        "itinerary": [
          {
            "start": "10:00",
            "startMinutes": 600,
            "activity": {
              "id": 291,
              "duration": 60,
              "price": 23
            }
          },
          {
            "start": "11:30",
            "startMinutes": 690,
            "activity": {
              "id": 488,
              "duration": 90,
              "price": 98
            }
          },
          {
            "start": "13:30",
            "startMinutes": 810,
            "activity": {
              "id": 690,
              "duration": 210,
              "price": 16
            }
          }
        ]
      }
    ]
  }
}
```
