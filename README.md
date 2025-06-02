# proc_planet
[![My Skills](https://skillicons.dev/icons?i=threejs)](https://skillicons.dev)
Procedural 3D planet generation based on Sebastian Lague's YouTube series, implemented using [Three.js](https://threejs.org/).

---

## Features

- Procedural generation of 3D planets in the browser
- Uses Three.js for rendering
- Inspired by Sebastian Lague's procedural planet tutorials
- Real-time rendering and interaction

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for running a local server, if needed)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/shazilkp/proc_planet.git
cd proc_planet
```

2. **Run using Live Server:**

The easiest way to run this project is with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code or any similar tool.

- Open the project folder in VS Code.
- Right-click on `index.html` and select **"Open with Live Server"**.
- Your default browser will open the project at a local address (e.g., `http://127.0.0.1:5500/`).

This ensures all assets and modules load correctly, as browsers restrict some features when opening files directly from disk[2][3][4][9].

3. Alternatively, you can use any local server (like Python's `http.server`, Node's `http-server`, or others).

---

## Usage

- The application will render a procedurally generated 3D planet.
- Use your mouse to rotate and zoom the view.
- The planet's terrain and appearance are generated using noise algorithms and Three.js shaders.

---

## Customization

- You can tweak parameters such as noise type, terrain roughness, and planet radius in the source code to generate different planets.
- The project structure and code are inspired by procedural generation techniques, including Perlin noise, simplex noise, and FBM (fractal Brownian motion).
- For more advanced customization, refer to Sebastian Lague's YouTube series and Three.js documentation.

---

## Credits

- Inspired by [Sebastian Lague's procedural planet series](https://www.youtube.com/playlist?list=PLFt_AvWsXl0dohbtVgHDNmgZV_UY7xZv7)
- Built with [Three.js](https://threejs.org/)

---

## License

This project is open source and available under the MIT License.

---

## Acknowledgments

- Thanks to the open-source community for resources on procedural planet generation in WebGL and Three.js.

Enjoy exploring and creating your own procedural planets!
