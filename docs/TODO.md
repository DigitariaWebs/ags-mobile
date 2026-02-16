# Agsmobile - Development TODO

This document tracks all development tasks for the Agsmobile agricultural platform based on the project specification.

---

## 🏗️ Project Setup & Infrastructure

### Foundation

- [x] Initialize React Native project for iOS and Android
- [x] Set up project structure and folder organization
- [x] Configure TypeScript
- [x] Set up ESLint and Prettier
- [ ] Configure environment variables management
- [x] Set up version control and branching strategy

### Backend & Database

- [ ] Design database schema for all entities (farms, users, jobs, products, training)
- [ ] Set up backend API framework (Node.js/Express or similar)
- [ ] Configure database (PostgreSQL/MongoDB)
- [ ] Implement API documentation (Swagger/OpenAPI)
- [ ] Set up backend environment (dev, staging, production)
- [ ] Configure cloud storage for media files (images, videos)

### Authentication & User Management

- [ ] Design user roles system (farmer, technician, recruiter, job seeker, admin)
- [x] Implement user registration flow
- [x] Implement user login/logout
- [x] Implement password reset functionality
- [ ] Add social authentication options (Google, Facebook)
- [ ] Create user profile management screens
- [ ] Implement role-based access control (RBAC)

---

## 🗺️ Feature: Interactive Map of Senegal

### Map Integration

- [x] Integrate map library (React Native Maps or Mapbox)
- [ ] Load Senegal administrative regions boundaries
- [ ] Implement region click/tap interactions
- [x] Add zoom and pan controls
- [ ] Optimize map performance for mobile devices

### Farm Management

- [ ] Create farm database schema (name, location, type, area, contact, etc.)
- [ ] Implement farm registration form for producers
- [ ] Add GPS coordinate picker/validator
- [ ] Create farm profile detail screen with all information
- [ ] Add photo gallery support for farms
- [ ] Implement farm search functionality

### Filtering & Display

- [ ] Create production type taxonomy (market gardening, livestock, rain-fed crops, etc.)
- [ ] Implement filter UI for production types
- [ ] Display farm markers on map by region
- [ ] Add farm list view (alternative to map view)
- [ ] Implement farm marker clustering for dense areas
- [ ] Add "nearby farms" feature using geolocation

---

## 🌾 Feature: Personalized Agricultural Advice

### Input Collection

- [x] Design multi-step advice form UI
- [x] Implement location selector (region/department/municipality)
- [x] Add cultivated area input with unit conversion (m²/hectares)
- [x] Create soil type selector (sandy, loamy, clay)
- [x] Add farm itinerary/production type selector
- [x] Implement crop type selector
- [x] Add form validation

### Recommendation Engine

- [ ] Research and compile fertilization guidelines by crop and soil type
- [ ] Build fertilization recommendation algorithm
- [ ] Create phytosanitary treatment database by crop
- [ ] Implement treatment recommendation logic (preventive & curative)
- [ ] Add seasonal considerations to recommendations
- [x] Create recommendation display screen with clear formatting

### Content Management

- [ ] Build admin interface for managing advice content
- [x] Create crop database with characteristics
- [x] Add soil type database with properties
- [ ] Implement fertilizer products database
- [ ] Add phytosanitary products database
- [ ] Enable content versioning and updates

---

## 💼 Feature: Agricultural Employment

### Foundation & Authentication

- [x] Add user type selection to signup (job seeker vs farm owner)
- [x] Update types and validation schemas for user types
- [x] Create UserContext for managing user type globally
- [x] Implement user type toggle functionality for testing
- [x] Create employment screen with dual views (job seeker & recruiter)
- [ ] Integrate Supabase authentication with user metadata
- [ ] Implement conditional routing based on user type
- [ ] Create role-based access control system

### Job Seeker Module

- [x] Create job seeker view in employment screen
- [x] Implement job search with real-time filtering
- [x] Add filter system by contract type (CDI, CDD, Saisonnier, Stage)
- [x] Display job listings with key information
- [x] Create job detail modal with full information
- [x] Add statistics dashboard (available jobs, applications, favorites)
- [x] Create mock job data for testing
- [ ] Create job seeker application form (10 fields as specified)
  - Personal information (name, contact, location)
  - Education level dropdown
  - Professional experience fields
  - Position type selector
  - Salary expectations input
  - Skills and certifications
  - Availability
  - Work preferences
- [ ] Implement form validation for all fields
- [ ] Create job seeker profile page
- [ ] Add profile editing functionality
- [x] Implement application viewing for recruiters
- [ ] Implement application submission for job seekers
- [ ] Add document upload (CV, certificates)
- [ ] Implement favorites/bookmarks functionality

### Recruiter/Employer Module

- [x] Create recruiter view in employment screen
- [x] Implement recruiter dashboard with statistics
- [x] Display list of posted jobs with management options
- [x] Add "Post New Job" button (fully functional)
- [x] Show applicant count per job
- [x] Create job management interface (view, edit buttons)
- [x] Build job posting form (title, farm name, location, contract, salary, description, requirements)
- [x] Implement job editing functionality
- [x] Implement job deletion functionality with confirmation
- [x] Implement job duplication functionality
- [x] Add applicant viewing interface with full details
- [x] Create applicant detail view for recruiters
- [x] Implement application status tracking (pending, reviewed, accepted, rejected)
- [x] Add action menu for job management
- [x] Create mock applicant data for testing
- [x] Add Senegalese regions and departments data
- [x] Implement form validation for job posting
- [ ] Create recruiter/farm registration form (initial onboarding)
  - Farm name and type
  - Location details
  - Farm size and crops
  - Contact information
  - Business registration details
- [ ] Add contact/messaging functionality between recruiters and seekers
- [ ] Add job posting approval workflow
- [ ] Implement real-time notifications for new applications

### Matching & Search

- [x] Build job search functionality with real-time search
- [x] Implement contract type filter
- [x] Add keyword search by title, farm name, and location
- [ ] Add advanced filters:
  - Location-based filtering (region, department)
  - Salary range filter
  - Position type filter
- [ ] Implement location-based job recommendations
- [ ] Create "suggested jobs" feature for seekers
- [ ] Add "recommended candidates" for recruiters
- [ ] Implement notification system for new matches
- [ ] Add saved jobs/candidates feature

### Documentation

- [x] Create EMPLOYMENT_FEATURE.md with comprehensive documentation
- [x] Document UserContext usage and architecture
- [x] Document job and application interfaces
- [x] Add future Supabase integration guide
- [x] Create test scenarios documentation
- [x] Add mock data documentation
- [x] Document job posting form implementation
- [x] Document application management system

---

## 📚 Feature: Agricultural Training

### Training Content

- [ ] Design training module structure
- [ ] Create content for greenhouse farming module
- [ ] Add soil typology educational content
- [ ] Develop technical itinerary guides (sowing to harvesting)
- [ ] Create disease and pest identification content
- [ ] Add irrigation and fertigation training materials
- [ ] Develop composting techniques module
- [ ] Add multimedia support (videos, images, diagrams)

### Learning Management

- [ ] Build course navigation and progress tracking
- [ ] Implement lesson completion tracking
- [ ] Add quizzes and assessments
- [ ] Create student dashboard with progress overview
- [ ] Implement bookmarking and note-taking features
- [ ] Add offline course content download

### Certification System

- [ ] Design certification requirements and criteria
- [ ] Create online training completion tracking
- [ ] Build on-site training scheduling system for Keur Ndiaye Lo
- [ ] Implement certificate generation functionality
- [ ] Add certificate verification system
- [ ] Create training history and certificates archive
- [ ] Build admin interface for managing certifications

---

## 💰 Feature: Advertising System

### Ad Platform

- [ ] Design ad placement zones in app
- [ ] Create advertiser registration and management portal
- [ ] Build ad campaign creation interface
- [ ] Implement ad targeting by location
- [ ] Add user type targeting for ads
- [ ] Create ad scheduling system
- [ ] Implement ad performance analytics
- [ ] Add ad impression and click tracking
- [ ] Ensure non-intrusive ad display

---

## 🛒 Feature: E-commerce (Agricultural Inputs)

### Product Catalog

- [ ] Design product database schema (fertilizers, phytosanitary, seeds, equipment)
- [ ] Create product listing interface
- [ ] Implement product detail pages with specifications
- [ ] Add product search and filtering
- [ ] Create product categories and taxonomy
- [ ] Add product images and descriptions
- [ ] Implement inventory management system

### Shopping Experience

- [ ] Build shopping cart functionality
- [ ] Implement cart persistence
- [ ] Create checkout flow
- [ ] Add address management
- [ ] Implement order summary screen

### Payment & Orders

- [ ] Integrate payment gateway (mobile money, cards)
- [ ] Implement payment processing
- [ ] Create order confirmation system
- [ ] Build order history and tracking
- [ ] Add delivery status updates
- [ ] Implement order management dashboard for admin
- [ ] Create invoice generation

### Logistics

- [ ] Design delivery zone management
- [ ] Implement delivery fee calculation
- [ ] Add delivery scheduling
- [ ] Create driver/delivery management system
- [ ] Implement delivery tracking for customers

---

## 🎨 UI/UX Design

- [ ] Create design system and component library
- [ ] Design app icon and splash screen
- [ ] Create wireframes for all screens
- [ ] Design high-fidelity mockups
- [ ] Implement responsive layouts for various screen sizes
- [ ] Add support for French language (primary)
- [ ] Consider additional local languages (Wolof, etc.)
- [ ] Implement dark mode support
- [ ] Ensure accessibility standards (WCAG)

---

## 🔔 Notifications & Engagement

- [ ] Set up push notification service (Firebase Cloud Messaging)
- [ ] Implement notification preferences
- [ ] Add notifications for new job matches
- [ ] Create order status notifications
- [ ] Add training reminders and updates
- [ ] Implement promotional notifications for products
- [ ] Add in-app notification center

---

## 📱 Mobile Features

- [ ] Implement offline mode for key features
- [ ] Add camera integration for farm photos and profiles
- [ ] Implement location services and GPS
- [ ] Add contact integration for easy communication
- [ ] Implement share functionality (share farms, jobs, products)
- [ ] Add app rating and feedback system
- [ ] Optimize for low-bandwidth conditions

---

## 🧪 Testing & Quality Assurance

### Unit Testing

- [ ] Set up testing framework (Jest)
- [ ] Write unit tests for business logic
- [ ] Test recommendation algorithms
- [ ] Test form validations
- [ ] Achieve 80%+ code coverage

### Integration Testing

- [ ] Test API endpoints
- [ ] Test database operations
- [ ] Test authentication flows
- [ ] Test payment processing
- [ ] Test notification delivery

### E2E Testing

- [ ] Set up E2E testing framework (Detox/Appium)
- [ ] Create test scenarios for critical user flows
- [ ] Test on various device sizes
- [ ] Test on different OS versions

### Performance Testing

- [ ] Test app performance and load times
- [ ] Optimize bundle size
- [ ] Test with large datasets
- [ ] Profile and optimize slow operations

---

## 🚀 Deployment & Launch

### Preparation

- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Prepare app store descriptions and screenshots
- [ ] Create promotional materials
- [ ] Set up analytics (Google Analytics, Mixpanel)
- [ ] Set up crash reporting (Sentry, Crashlytics)
- [ ] Create user documentation and FAQs

### App Store Deployment

- [ ] Set up Apple Developer account
- [ ] Configure iOS app signing and provisioning
- [ ] Submit iOS app to App Store
- [ ] Set up Google Play Developer account
- [ ] Configure Android app signing
- [ ] Submit Android app to Google Play

### Backend Deployment

- [ ] Set up production server infrastructure
- [ ] Configure CI/CD pipeline
- [ ] Set up database backups
- [ ] Implement logging and monitoring
- [ ] Configure CDN for media files
- [ ] Set up SSL certificates

### Launch

- [ ] Conduct beta testing with selected users
- [ ] Fix critical bugs from beta feedback
- [ ] Prepare launch marketing campaign
- [ ] Soft launch in limited regions
- [ ] Monitor metrics and user feedback
- [ ] Full public launch
- [ ] Post-launch monitoring and support

---

## 📊 Post-Launch

- [ ] Monitor app performance and stability
- [ ] Collect and analyze user feedback
- [ ] Track key metrics (DAU, retention, conversions)
- [ ] Plan feature iterations and improvements
- [ ] Regular content updates (training materials, advice)
- [ ] Maintain and update product catalog
- [ ] Build partnerships with input suppliers and NGOs
- [ ] Scale infrastructure as user base grows

---

## 📝 Notes

- All features should work seamlessly on both iOS and Android
- The app must be optimized for rural areas with limited connectivity
- Security and data privacy are critical, especially for user personal information
- The app should be intuitive for users with varying levels of tech literacy
- Regular updates to agricultural content based on seasons and research
