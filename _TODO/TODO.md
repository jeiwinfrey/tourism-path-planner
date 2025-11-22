# Tourism Path Planner - TODO

## Simple Map & Routing Integration

### 1. Map Setup (Mapbox)
- [ ] Install Mapbox GL JS and React Map GL packages
- [ ] Create a basic Mapbox map component
- [ ] Add map to the map page

### 2. Routing Setup (OSRM or GraphHopper)
## This is for the directions API and the calculation of distances to be used as weights of each node for the UCS
- [ ] Choose routing service (OSRM or GraphHopper)
- [ ] Install routing dependencies
- [ ] Add routing to the map

### 3. Data Gathering for Tourist Locations
- [ ] Research and collect tourist spots data (coordinates, names, categories)
- [ ] Add tourist location markers to the map
- [ ] Store location data (JSON file or database)

### 4. Rule-Based Path Planning 
- [x] Implement rules using the interest choices what to display in MapPage

### 5. Implement UCS calculation
- [ ] Using the weight/distances, get the most optimal route

### 6. Implement AI chatbot integration 
- [ ] AI will be able to modify the personalized itinerary
