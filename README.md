# Sunrise Animation

## Description
Sunrise Animation is a simple, elegant web-based animation that simulates a day-night cycle. Using HTML5 Canvas and JavaScript, it creates a visually appealing representation of the sun's movement, changing sky colors, and the appearance of stars and the moon.

## Features
- Smooth animation of the sun rising and setting
- Dynamic sky color changes to represent different times of day
- Twinkling stars that appear during night time
- Moon visibility during the darkest part of the night
- Seamless 10-second loop for continuous animation
- Responsive design that works on various screen sizes

## Installation

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML and JavaScript (for customization)

### Steps
1. Clone the repository or download the HTML file:
   ```
   git clone https://github.com/yourusername/sunrise-animation.git
   ```
   Or simply download the `index.html` file.

2. Open the `index.html` file in your web browser.

That's it! No additional setup or installation is required.

## Usage
- Open the `index.html` file in a web browser to view the animation.
- The animation will start automatically and loop every 10 seconds.

## Customization
You can easily customize the animation by modifying the JavaScript code:

- Adjust the `animationDuration` variable to change the speed of the day-night cycle.
- Modify the colors in the `getSkyColor` function to change the sky's appearance.
- Alter the `drawTree` function to change the appearance of the trees.
- Adjust the number of stars by changing the `Array(50)` to your desired number.

## Integration with Obsidian
To use this animation in Obsidian:

1. Save the `index.html` file in your Obsidian vault.
2. In an Obsidian note, use the following syntax to embed the animation:
   ```
   <iframe src="index.html" width="400" height="300"></iframe>
   ```
3. Adjust the width and height as needed to fit your layout.

## Contributing
Contributions to improve the animation or add new features are welcome. Please feel free to submit a pull request or open an issue for any bugs or suggestions.

## License
This project is open source and available under the [MIT License](LICENSE).