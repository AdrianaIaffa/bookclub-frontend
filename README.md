**Timeframe**<br>
5 days solo project

**Technical Requirements**<br>
-Develop a full-stack Django/React application.<br>
-Connect to and perform data operations on a PostgreSQL database.<br>
-Optionally consume a third-party API with at least one additional data entity.<br>
-If not using an API, have at least two data entities with a one to many and a many to many relationships.<br>
-Implement full-CRUD data operations across models (excluding User model).<br>
-Authenticate users using Django's built-in authentication.<br>
-Implement authorization by restricting access using login_required or LoginRequiredMixin.<br>
-Deploy the app online using Railway.<br>

**Technologies Used**<br>

-React:** A JavaScript library for building user interfaces.<br>
-React Router:** A standard library for routing in React applications.<br>
-CSS:** Styling the user interface for a visually appealing experience.<br>
-Django:** A high-level Python web framework that encourages rapid development and clean, pragmatic design.<br>
-PostgreSQL:** A powerful, open-source relational database system used for data storage.<br>
-Django Rest Framework (DRF):** A powerful and flexible toolkit for building Web APIs in Django.<br>
-Railway:** Used for deploying the application online.<br>
-Git/GitHub:** Version control and collaboration for managing team contributions.<br>
-Python:** The programming language used for the Django backend.<br>
-Node.js:** Required for running and building React applications.<br>
-Coolors<br>
-Blush.design for illustrations<br>

**Deployed projec**t<br>
https://bookclub-frontend-production.up.railway.app/landingpage

You can find the backend for this project here<br>
https://github.com/AdrianaIaffa/bookclub-backend

**Wireframe/Planning**<br>
![Screenshot 2023-12-12 at 11 01 41](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/4334e791-08bb-46df-9b32-06ba5656b676)

**Day1**<br>
I spent most of the time drawing a diagram for my database, as it needed to include a one to many and a many to many relationships. At first I wanted to create an application where users could  share books with each other, but Struggled with the many to many relationship.
I have by now created 2 other projects and I understood how important is the planning stage. I wanted to keep this project as simple as possible, since this was my first projectusing all the technologies at use, and I was aware of
how quick 5 days go by.

I decided to settle for a book club where users can create a book club for their favourite books and they can join as many book club as they want. They are able to join a discussion and leave comments under each book.

**Day 2**<br>
I started laying out my backend views with my book clubview set and my userview set as well as the serializers. I had done a lesson with how to set up a project and how to implement serialisers, so I followed that lesson again to set up my project. I wanted to make sure to have my crud functionality on my bookclub view, since I only had a week to do this project so I wanted to make sure all the basics were covered. Also I followed a tutorial on how to set up a user using a token, so users could sign in and be kept logged in. Unfortunately my refresh token ended up not working so I currently have a bug where I need to log in after a few minutes.
For my backend I used Postman again and it made sorting out the functionality a dream and speedy.

**Day 3**<br>
I created my book club views for all the bookclubs as well as a single book club. I realised that I wanted each book to have a discussion field, where users can enter what topics they want to discuss about the book in particular and also a created by field on my bookclub scg=hema, so I had to go back and edit it. I realised this wasn't as easy as it had been when using MongoDb, so I had to add null+true, blank+true so I could add it but also edit the values after.
I knew I wanted some conditional rendering depending on who is logged in, so I wanted to make sure that if the user is logged in can see all the bookclubs and if they are not part of a book club they can only see the join button. If they are part of the book club they can only see the leave button. And if they have created the book club they can see the delete and edit bookclub buttons. When a user created a bookclub, they become part of a book club immediately so the book club will always have 1 member as default.

    class BookClub(models.Model):
        name = models.CharField(max_length=250)
        description = models.TextField()
        members = models.ManyToManyField(User)
        discussion = models.TextField(null=True, blank=True)
        created_by = models.ForeignKey(
            'auth.User', on_delete=models.CASCADE, 
            related_name='created_bookclubs'
            )
        def __str__(self):
            return self.name

**Day 4**<br>
I decided to implement my comments section but since I was running out of time, I only added the add comment and more conditional rendering inside a book club so you can only add comments if you are a member of the book club, although you can see all the comments. Regardless of membership. I also decided to deploy since I had not much time left and wanted to make sure any issues that came with it were caught before the deadline

I had quite a few issues with my site and had to redo the entire conditional rendering as even though it was showing on my localhost it wasnt working on my deployed version

**Day 5**<br> 
I managed to resolve most of my conditional rendering except my delete button redirect, which still doesn't work. I realised as I was resolving all my issues I made the mistake of adding all my bookclub actions inside the book club view, which meant the router was having issues with the url. Going forward i will make sure all my views are independent from each other

**Bugs:**<br>
Redirect from delete bookclub to all the bookclubs doesn't work , needs to be done manually

**Takeaways from project**<br>
This was my first project using Django and PostgreSQL and I really enjoyed using this technologies. By this point I had done two other CRUD projects, so maybe that's why it seem to make more sense when I as going through this project. I also realised that keeping it basic is best, as it makes more sense to nail the basics and build from there. 
My big mistake was to add all my functionality inside my bookclub view. I should have kept them independent from each other, which would have made my deployement less troublesome. 
But overall I am happy with how the project ended up looking and again, I loved doing the styling for this, which always brings me so much joy.

![Screenshot 2023-11-27 at 12 29 26 (2)](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/8f3ef6ea-883a-445b-bde4-a738c2a8cbee)
![bookclub](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/20314584-72d0-4af8-9363-20f015927d0f)
![Screenshot 2023-12-11 at 10 37 03](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/2f245ef4-b406-42b0-b50c-32cc310a23a6)
![Screenshot 2023-12-11 at 10 42 20](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/f2f98cab-bce8-44a8-a796-ad7573635b54)
![Screenshot 2023-12-11 at 10 42 14](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/de7e9291-267d-44df-8ef4-a99993113420)
![Screenshot 2023-12-11 at 10 36 35](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/b551a6c4-6782-40c3-8deb-7326448ae655)
![Screenshot 2023-12-11 at 10 44 16](https://github.com/AdrianaIaffa/bookclub-frontend/assets/100214999/fdb9e41c-1d23-4953-86a7-322c749d77dc)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
