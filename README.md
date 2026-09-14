# Wayfare - Ride Booking Platform

## Overview

Wayfare is a ride booking platform with separate experiences for riders and captains (drivers). This repository contains the frontend application. It provides the browser interface for authentication, location selection, fare and vehicle selection, ride status tracking, captain ride management, live location updates, and payment actions.

The frontend communicates with the Wayfare backend maintained in a separate repository. Backend authentication, ride coordination, mapping services, payment order creation, and payment state management are exposed to this application through HTTP and Socket.io integrations.

## Features

- Rider registration and login.
- Captain registration and login, including vehicle details.
- Protected rider and captain routes with profile validation.
- Pickup and destination search suggestions through the backend.
- Browser geolocation for the rider's current pickup address.
- Fare lookup for car, moto, and auto vehicle types.
- Ride creation with cash or online payment selection.
- Captain ride availability notifications with accept and ignore actions.
- Captain OTP verification to start a ride.
- Live captain location updates during pickup and the ride.
- Route display using GeoJSON on an interactive Leaflet map.
- Ride status transitions for waiting, started, ended, and completed rides.
- Cash payment confirmation and online payment state handling.
- Toast notifications for successful actions and errors.
- Responsive interfaces with animated panels and transitions.

## Tech Stack

- React 19 with React DOM.
- Vite for development and production builds.
- React Router for client-side routing.
- Redux Toolkit and React Redux for rider and captain authentication state.
- Axios for backend HTTP requests.
- Socket.io Client for real-time ride and location events.
- Leaflet, React Leaflet, and Leaflet Rotate for maps and route rendering.
- OpenStreetMap tiles displayed through Leaflet.
- Tailwind CSS 4 through the Vite plugin, with `tw-animate-css` and shadcn configuration.
- GSAP and `@gsap/react` for panel and interface animations.
- Embla Carousel and Embla Autoplay for the landing-page vehicle carousel.
- React Hook Form for authentication and OTP forms.
- React Toastify for notifications.
- Lucide React and React Icons for interface icons.
- Razorpay Checkout for the browser payment checkout.

## Project Structure

```text
.
├── public/                    # Public static files
├── src/
│   ├── assets/                # Branding, vehicle, and Leaflet marker assets
│   ├── components/            # Reusable ride, map, form, and protected-route UI
│   ├── context/               # Shared Socket.io context
│   ├── lib/                   # Shared utilities, including the Axios instance
│   ├── pages/                 # Route-level rider and captain screens
│   ├── redux/
│   │   ├── Slices/            # Rider and captain auth slices
│   │   └── store.js           # Redux store configuration
│   ├── App.jsx                # Browser routes and protected route composition
│   ├── App.css                # Embla carousel styles
│   ├── index.css              # Tailwind imports, theme, global styles, animations
│   └── main.jsx               # React entry point and application providers
├── index.html                 # HTML shell and Razorpay Checkout script
├── vite.config.js             # Vite, React, and Tailwind configuration
├── vercel.json                # SPA rewrite configuration for Vercel
├── components.json            # Component tooling configuration
├── eslint.config.js           # ESLint configuration
├── jsconfig.json              # JavaScript project configuration
└── package.json               # Dependencies and npm scripts
```

Important route-level screens include `Start`, rider authentication, `Home`, `WaitingForDriver`, `Riding`, captain authentication, `CaptainHome`, `GoToPickup`, and `CaptainRiding`.

## Application Flow

### User flow

1. A rider starts at `/`, then creates an account or signs in.
2. The protected `/home` screen lets the rider enter pickup and destination locations or use the browser's current location.
3. The frontend requests location suggestions and a fare estimate from the backend.
4. The rider selects car, moto, or auto, chooses cash or online payment, and creates the ride.
5. The rider waits at `/waiting-for-driver` while the captain is matched. Captain location and ride-start events update the screen in real time.
6. The ride continues at `/riding`, where the rider can see the route and captain location. After the ride ends, the rider can complete an online payment through Razorpay or wait for cash payment confirmation.

### Captain flow

1. A captain registers with personal and vehicle information or signs in.
2. The protected `/captain-home` screen shares the captain's browser location and listens for new ride requests.
3. The captain accepts a ride and moves to `/going-to-pickup`.
4. The captain's location is watched and sent to the backend while travelling to the pickup point.
5. The captain enters the rider's four-digit OTP to start the ride and moves to `/captain-riding`.
6. The captain can finish the ride and, for cash rides, confirm that payment was received.

## API Integration

HTTP requests use the shared Axios instance in `src/lib/axios.js`. Its base URL is `${VITE_BASE_URL}/api` and it sends credentials with requests. Protected profile requests also pass the bearer token stored in browser local storage under `wf_token`.

The frontend currently calls backend endpoints for:

- User and captain registration, login, and profile retrieval.
- Map suggestions, reverse geocoding, and route retrieval.
- Fare lookup and ride creation.
- Ride confirmation, ride start, and ride completion.
- Razorpay order creation and payment status lookup.
- Cash payment confirmation.

The backend repository owns these endpoints and their business logic. No secrets, access tokens, or private backend URLs are included in this README.

## Real-Time Communication

Socket.io Client connects to `VITE_BASE_URL` in `src/context/SocketContext.jsx` and makes the socket available through React context.

The rider and captain clients join role-specific rooms and use events including:

- `new-ride` to notify captains about available rides.
- `ride-confirmed` to move a rider into the driver-waiting state.
- `ride-started` to move the rider into the active ride.
- `captain-live-location` to update the rider's map.
- `update-location-captain` to send captain location data to the backend.
- `ride-ended` and `cash-payment-received` for ride and cash-payment state updates.
- `online-payment-received` to update the captain's payment state.

## Maps & Location

The frontend uses browser Geolocation APIs to read rider and captain coordinates. Backend map endpoints provide suggestions, reverse-geocoded addresses, and route data.

`src/components/Map.jsx` renders the map with React Leaflet and Leaflet. It uses OpenStreetMap tiles, local Leaflet marker assets, marker popups, and GeoJSON route layers. The map fits its view to the first valid route and supports the Leaflet Rotate package. Geoapify is not directly implemented in this frontend.

## Payment

The rider can select cash or online payment when confirming a ride. For online payment after the ride ends, the frontend:

1. Requests an order from `/payment/create-order`.
2. Opens the Razorpay Checkout script loaded by `index.html`, using `VITE_RAZORPAY_KEY_ID` as the public checkout key.
3. Handles Razorpay failure and checkout-closed events in the UI.
4. Synchronizes the ride payment state through `/payment/status/:rideId`.

The captain can confirm cash payment through `/payment/confirm-cash`. The frontend contains a payment handler for the Razorpay success callback, but the backend verification request in that callback is currently commented out; payment verification remains a backend responsibility and an integration area to review before production use.

## Environment Variables

Create a local `.env` file with the variable names required by the frontend:

```env
VITE_BASE_URL=
VITE_RAZORPAY_KEY_ID=
```

Do not commit secret values. `VITE_RAZORPAY_KEY_ID` is used as a client-side Razorpay checkout key; it is not a substitute for server-side payment verification or secret credentials.

## Installation

1. Install a current Node.js version compatible with the versions in `package.json`.
2. Clone this frontend repository and open its directory.
3. Install dependencies:

	```bash
	npm install
	```

4. Create `.env` with the required variable names and values for the separately maintained backend and Razorpay checkout.
5. Start the development server:

	```bash
	npm run dev
	```

The Vite development server will print the local URL in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build with Vite. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run preview` | Serves the production build locally for preview. |

## Backend Repository

The backend is maintained separately. Add the repository URL here:

**Wayfare backend:** [https://github.com/aditya90585/wayfare-backend](https://github.com/aditya90585/wayfare-backend)

## Live Demo

[https://wayfarerides.vercel.app](https://wayfarerides.vercel.app)


## Future Improvements

The following are future ideas, not claims about the current implementation:

- Add automated component and end-to-end tests for rider, captain, map, socket, and payment flows.
- Complete and harden the Razorpay server-side verification flow before production payment use.
- Add a clearer logout flow and more explicit session-expiration handling for both roles.
- Improve map error, permission-denied, and offline states.
- Replace hard-coded presentation values in captain statistics and ride-distance displays with backend data.
- Add route-level loading and error boundaries for a more resilient production experience.
- Add accessibility audits for interactive panels, maps, forms, and keyboard navigation.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
