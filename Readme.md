***Explain how indexes work in MongoDB and how they improve query performance.***
Answer
1. In the case of retreival and column that is often used for retreiving can be  indexed to get fatser result .
This will allow Mongo to only look for an indexed column instead of filtering through the entire application

***What MongoDB indexes would you create for a large-scale e-commerce system where
queries frequently filter by status and createdAt?***

I will index both status and createAt 

db.orders.createIndex({ status: 1, createdAt: -1 })


*** Difference Between Git Merge and git Rebase ***
The are both used to merge commit form different branch 
Git merge keeps the commit history of each of the different branches
Git rebase rewrite the commit history


**** 
Given the following commit history:
* commit D (feature-branch)
* commit C (feature-branch)
| * commit B (main)
| * commit A (main) 

How would you merge feature-branch into main while keeping a clean commit history?
****

git checkout feature-branch
git rebase main
git checkout main 
git merge feature-branch 


**** How would you merge feature-branch into main while keeping a clean commit history?*****

git commit -m "
 -feat(api): add GET endpoint for fetching user profile
- Implemented a new GET /api/v1/users/profile endpoint to fetch the logged-in user's profile.
- Added authentication middleware to ensure only authenticated users can access the endpoint.
- Fetched user data from the database and returned it in the response.
- Updated API documentation with the new endpoint details."


