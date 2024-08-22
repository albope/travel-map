# Travel-Map Generator

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The **Travel-Map Generator** is a web application designed to help users visualize and share their travel experiences. With this tool, users can select the countries they have visited, generate a customized map showcasing their travels, and share it with friends and family. Additionally, users can plan their future travels by visualizing the countries they have yet to visit.

This project is a result of my passion for development and travel, created during my spare time. It is designed to be simple, intuitive, and fun to use, making it easy for anyone to showcase their travel adventures.

## Features

- **Country Selection**: Choose from a list of 195 countries to mark as visited.
- **Custom Map Generation**: Generate a personalized travel map based on your selections.
- **Share & Download**: Easily share your travel map with friends or download it as a PNG file.
- **Statistics**: View statistics about the number of countries visited, the continents covered, and the percentage of the world you’ve explored.
- **Responsive Design**: The application is fully responsive and works across different devices and screen sizes.
- **Feedback**: Users can submit feedback to help improve the application.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/albope/travel-map.git
```

2. **Navigate to the project directory**:

```bash
cd travel-map
```

3. **Install dependencies**:

```bash
npm install
```

4. **Run the development server**:

```bash
npm start
```

5. **Open your browser and navigate to**:

```arduino
http://localhost:3000
```
## Usage

1. **Select Countries**: Use the country selector to mark the countries you’ve visited.
2. **View Statistics**: Check out the statistics section to see how many countries and continents you’ve covered, and what percentage of the world you’ve explored.
3. **Generate & Share Map**: Scroll down to the map generator section, generate your custom map, and share it with others or download it.
4. **Submit Feedback**: If you have any feedback or suggestions, use the feedback button to send your thoughts directly.

## Technology Stack

**Frontend**:

**React.js**: Core library for building the user interface.

**React Router**: For handling client-side routing.

**FontAwesome**: For icons used throughout the application.

**DOM-to-Image**: To generate PNG images from the DOM.

**Styling**:

**CSS**: Custom styling for the entire application.

## Project Structure

```
travel-map/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── CountrySelector.jsx
│   │   ├── FeedbackModal.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── MapComponent.jsx
│   │   ├── ShareButtons.jsx
│   │   ├── StatsCard.jsx
│   │   └── ... (other components)
│   │
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── ... (other files)
│
├── .gitignore
├── package.json
├── README.md
└── ... (other files)

```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to fork the repository and submit a pull request.

**Fork the Project.**

**Create your Feature Branch** (git checkout -b feature/YourFeature).

**Commit your Changes** (git commit -m 'Add some YourFeature').

**Push to the Branch** (git push origin feature/YourFeature).

**Open a Pull Request**

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

**Author**: Alberto Bort

**Email**: albertobort@gmail.com

**LinkedIn**: linkedin.com/in/albertobort

**GitHub Repository**: Travel-Map Generator

Stay connected for updates and new features!
