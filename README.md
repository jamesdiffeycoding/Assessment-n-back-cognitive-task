# N-Back Task App

<!-- THIS README WAS GENERATED BY AI -->

This app implements a 2-back task, a classic experimental psychology game designed to assess working memory. The task presents a sequence of letters, one at a time, and the user must determine whether the current letter is the same as the one presented two steps earlier in the sequence.

# Key Features:

- Game Flow: Letters are shown for 500ms, followed by a 2500ms blank screen. If the user presses a key during the blank screen, it is assumed to be a response to the previous letter.
- Task Duration: The task ends after 2 errors or after 15 letters are displayed, whichever comes first.
- Results: At the end of the game, the app displays the number of correct guesses and errors.
- Mobile Compatibility: The user interface is optimized for mobile devices.
- User Interaction: When the user interacts with the game, an event is triggered to record the user's actions (e.g., key presses) and timestamps, mimicking an API interaction.
- User Experience:
- The app is designed to be engaging and user-friendly. You can customize it with images instead of letters if desired, or adjust the task to better suit different preferences.
- The project is built using React and can be deployed online for easy access.
