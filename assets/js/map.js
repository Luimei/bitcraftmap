"use strict"
// N = Z = lat = Bottom to top
// E = X = lgt = left to right

const mapOptions = createMapOptions()
const appOptions = createAppOptions()
const map = L.map('map', mapOptions)
const mapBounds = [[0, 0], [mapOptions.mapWidth, mapOptions.mapHeight]]
const mapBoundsWithOcean = [[0, 0], [mapOptions.mapHeight * mapOptions.apothem, mapOptions.mapWidth]]
const mapImageLayer = L.imageOverlay('assets/maps/map.png', mapBoundsWithOcean)

map.addLayer(mapImageLayer)
map.fitBounds(mapBounds)

// Overwriting the default icon parameters
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    "iconUrl": iconsManifest['Hex_Logo'],
    "iconRetinaUrl": iconsManifest['Hex_Logo'],
    "iconSize": [32, 32],
    "iconAnchor": [16, 16],
    "popupAnchor": [0, -16],
    "tooltipAnchor": [-16, 0],
    "shadowUrl": null,
    "shadowSize": null,
    "shadowAnchor": null,
    "shadowRetinaUrl": null
})

function createIcon(iconName = 'Hex_Logo', iconSize = [32, 32]) {
    const width = iconSize[0] ?? 32
    const height = iconSize[1] ?? 32
    return L.icon({
        iconUrl: iconsManifest[iconName],
        iconSize: [width, height],
        iconAnchor: [width / 2, height / 2],
        popupAnchor: [0, -height / 2],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    })
}

const caveIcons = [
    createIcon('t1'), createIcon('t2'), createIcon('t3'), createIcon('t4'), createIcon('t5'),
    createIcon('t6'), createIcon('t7'), createIcon('t8'), createIcon('t9'), createIcon('t10')
]

const claimIcons = [
    createIcon('claimT0'), createIcon('claimT1'), createIcon('claimT2'), createIcon('claimT3'), createIcon('claimT4'), createIcon('claimT5'),
    createIcon('claimT6'), createIcon('claimT7'), createIcon('claimT8'), createIcon('claimT9'), createIcon('claimT10')
]

const ruinedIcon = createIcon('ruinedCity')
const templeIcon = createIcon('temple')
const treeIcon = createIcon('travelerTree')

const treesLayer = L.layerGroup()
const ruinedLayer = L.layerGroup()
const templesLayer = L.layerGroup()
const banksLayer = L.layerGroup()
const marketsLayer = L.layerGroup()
const waystonesLayer = L.layerGroup()
const gridsLayer = L.layerGroup()
const dungeonsLayer = L.layerGroup()
const waypointsLayer = L.layerGroup()

const claimT0Layer = L.layerGroup()
const claimT1Layer = L.layerGroup()
const claimT2Layer = L.layerGroup()
const claimT3Layer = L.layerGroup()
const claimT4Layer = L.layerGroup()
const claimT5Layer = L.layerGroup()
const claimT6Layer = L.layerGroup()
const claimT7Layer = L.layerGroup()
const claimT8Layer = L.layerGroup()
const claimT9Layer = L.layerGroup()
const claimT10Layer = L.layerGroup()

const claimLayers = [
    claimT0Layer, claimT1Layer, claimT2Layer, claimT3Layer, claimT4Layer, claimT5Layer,
    claimT6Layer, claimT7Layer, claimT8Layer, claimT9Layer, claimT10Layer
]

const allClaims = L.layerGroup(claimLayers)
const searchGroup = L.layerGroup(claimLayers.concat(ruinedLayer))

const caveT1Layer = L.layerGroup()
const caveT2Layer = L.layerGroup()
const caveT3Layer = L.layerGroup()
const caveT4Layer = L.layerGroup()
const caveT5Layer = L.layerGroup()
const caveT6Layer = L.layerGroup()
const caveT7Layer = L.layerGroup()
const caveT8Layer = L.layerGroup()
const caveT9Layer = L.layerGroup()
const caveT10Layer = L.layerGroup()

const caveLayers = [
    caveT1Layer, caveT2Layer, caveT3Layer, caveT4Layer, caveT5Layer,
    caveT6Layer, caveT7Layer, caveT8Layer, caveT9Layer, caveT10Layer
]

const allCaves = L.layerGroup(caveLayers)

const region1Roads = L.layerGroup()
const region2Roads = L.layerGroup()
const region3Roads = L.layerGroup()
const region4Roads = L.layerGroup()
const region5Roads = L.layerGroup()
const region6Roads = L.layerGroup()
const region7Roads = L.layerGroup()
const region8Roads = L.layerGroup()
const region9Roads = L.layerGroup()

const roadsLayers = [
    region1Roads, region2Roads, region3Roads, region4Roads, region5Roads,
    region6Roads, region7Roads, region8Roads, region9Roads,
]

const allRoads = L.layerGroup(roadsLayers)

const genericToggle = {
    "Wonders": treesLayer,
    "Temples": templesLayer,
    "Ruined Cities": ruinedLayer,
    "Banks": banksLayer,
    "Markets": marketsLayer,
    "Waystones": waystonesLayer,
    "Grids": gridsLayer,
    "Dungeons": dungeonsLayer,
    "Waypoints": waypointsLayer,
    "Claims": allClaims,
    "Claims T1": claimT1Layer,
    "Claims T2": claimT2Layer,
    "Claims T3": claimT3Layer,
    "Claims T4": claimT4Layer,
    "Claims T5": claimT5Layer,
    "Claims T6": claimT6Layer,
    "Claims T7": claimT7Layer,
    "Claims T8": claimT8Layer,
    "Claims T9": claimT9Layer,
    "Claims T10": claimT10Layer,
    "Caves": allCaves,
    "Caves T1": caveT1Layer,
    "Caves T2": caveT2Layer,
    "Caves T3": caveT3Layer,
    "Caves T4": caveT4Layer,
    "Caves T5": caveT5Layer,
    "Caves T6": caveT6Layer,
    "Caves T7": caveT7Layer,
    "Caves T8": caveT8Layer,
    "R1 roads": region1Roads,
    "R2 roads": region2Roads,
    "R3 roads": region3Roads,
    "R4 roads": region4Roads,
    "R5 roads": region5Roads,
    "R6 roads": region6Roads,
    "R7 roads": region7Roads,
    "R8 roads": region8Roads,
    "R9 roads": region9Roads
}

const allLayers = {
    treesLayer, templesLayer, ruinedLayer, banksLayer, marketsLayer, waystonesLayer, waypointsLayer,
    claimT0Layer, claimT1Layer, claimT2Layer, claimT3Layer, claimT4Layer, claimT5Layer,
    claimT6Layer, claimT7Layer, claimT8Layer, claimT9Layer, claimT10Layer,
    caveT1Layer, caveT2Layer, caveT3Layer, caveT4Layer, caveT5Layer,
    caveT6Layer, caveT7Layer, caveT8Layer, caveT9Layer, caveT10Layer,
    region1Roads, region2Roads, region3Roads, region4Roads, region5Roads,
    region6Roads, region7Roads, region8Roads, region9Roads, dungeonsLayer
}



// This is leaflet.search plugin configuration
// This plugin need a "title" parameter in each marker to find stuff
const searchControlOptions = {
    position: 'topleft',
    layer: searchGroup,
    initial: false,
    marker: false,
    firstTipSubmit: true,
    zoom: 0
}
const searchControl = new L.Control.Search(searchControlOptions)

// Load the marker if it is no already on the map
searchControl.on('search:locationfound', function (marker) {
    if (!map.hasLayer(marker.layer)) {
        map.addLayer(marker.layer)
    }
})

// -------------------------------------- //
// This is getting replaced
// -------------------------------------- //
async function loadTreesGeoJson() {
    const file = await fetch('assets/markers/trees.geojson')
    const geojsonData = await file.json()
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {

            const coords = readableCoordinates(latlng)
            const name = feature.properties.name + '<br>'
            const loc = 'N ' + coords[0] + ' E ' + coords[1]
            const popupText = name + loc

            return L.marker(
                latlng,
                { icon: treeIcon }
            )
                .bindPopup(popupText)
                .addTo(treesLayer)
        }
    })
}
async function loadTemplesGeoJson() {
    const file = await fetch('assets/markers/temples.geojson')
    const geojsonData = await file.json()
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {

            const coords = readableCoordinates(latlng)
            const name = feature.properties.name + '<br>'
            const loc = 'N ' + coords[0] + ' E ' + coords[1]
            const popupText = name + loc

            return L.marker(
                latlng,
                { icon: templeIcon }
            )
                .bindPopup(popupText)
                .addTo(templesLayer)
        }
    })
}
async function loadRuinedGeoJson() {
    const file = await fetch('assets/markers/ruined.geojson')
    const geojsonData = await file.json()
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {

            const coords = readableCoordinates(latlng)
            const name = feature.properties.name + '<br>'
            const loc = 'N ' + coords[0] + ' E ' + coords[1]
            const popupText = name + loc

            return L.marker(
                latlng,
                {
                    title: feature.properties.name + ' N ' + coords[0] + ' E ' + coords[1],
                    icon: ruinedIcon
                }
            )
                .bindPopup(popupText)
                .addTo(ruinedLayer)
        }
    })
}
async function loadClaimsGeoJson() {
    const file = await fetch('assets/markers/claims.geojson')
    const geojsonData = await file.json()
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {

            const coords = readableCoordinates(latlng)
            const name = '<a href="' + 'https://bitjita.com/claims/' + feature.properties.entityId + '" target="_blank">' + feature.properties.name + '</a>'
            const tier = ' (T' + feature.properties.tier + ')' + '<br>'
            const loc = 'N ' + coords[0] + ' E ' + coords[1] + '<br>'
            const has_bank = 'Bank : ' + (feature.properties.has_bank ? 'Yes' : 'No') + '<br>'
            const has_market = 'Market : ' + (feature.properties.has_market ? 'Yes' : 'No') + '<br>'
            const has_Waystone = 'Waystone : ' + (feature.properties.has_waystone ? 'Yes' : 'No')
            const popupText = name + tier + loc + has_bank + has_market + has_Waystone

            const marker = L.marker(
                latlng,
                {
                    title: feature.properties.name + ' N ' + coords[0] + ' E ' + coords[1],
                    icon: claimIcons[feature.properties.tier]
                }
            )

            marker.bindPopup(popupText)
            marker.addTo(claimLayers[feature.properties.tier])

            if (feature.properties.has_bank) {
                marker.addTo(banksLayer)
            }
            if (feature.properties.has_market) {
                marker.addTo(marketsLayer)
            }
            if (feature.properties.has_waystone) {
                marker.addTo(waystonesLayer)
            }

            return marker
        }
    })
}
async function loadCavesGeoJson() {
    const file = await fetch('assets/markers/caves.geojson')
    const geojsonData = await file.json()
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {

            const coords = readableCoordinates(latlng)
            const name = feature.properties.name + '<br>'
            const loc = 'N ' + coords[0] + ' E ' + coords[1]
            const popupText = name + loc

            return L.marker(
                latlng,
                { icon: caveIcons[feature.properties.tier - 1] }
            )
                .bindPopup(popupText)
                .addTo(caveLayers[feature.properties.tier - 1])
        }
    })
}
// -------------------------------------- //
// This is getting replaced
// -------------------------------------- //

// Function to convert to N E coordinate people know about
function readableCoordinates(latlng) {
    return [Math.round(latlng.lat / 3), Math.round(latlng.lng / 3)]
}

// Bit of code to get the position at the mouse and display it
map.on('mousemove', function (e) {
    const coordDisplay = document.getElementById('coords')
    const coords = readableCoordinates(e.latlng)
    coordDisplay.innerText = 'N: ' + coords[0] + ' E: ' + coords[1]
})

function loadGeoJsonFromHash() {
    const hashFromUrl = location.hash.slice(1)
    if (!hashFromUrl) return
    const geoJson = validateGeoJson(hashFromUrl)
    paintGeoJson(geoJson, waypointsLayer)
    map.addLayer(waypointsLayer)
}

async function getLatestGistRaw(gistId) {
    const baseApi = 'https://api.github.com/gists/'
    if (!/^[a-fA-F0-9]{32}$/.test(gistId)) throw new Error('gistId is invalid')
    let lastGistCommitVersion
    try {
        const gistCommits = await fetch(baseApi + gistId + '/commits')
        const gistCommitsJson = await gistCommits.json()
        if (!Array.isArray(gistCommitsJson) || gistCommitsJson.length === 0) {
            throw new Error('No commits found for this gist')
        }
        lastGistCommitVersion = gistCommitsJson[0].version
    } catch (error) { console.log(error) }
    let lastGistRawUrl
    try {
        const gistInfo = await fetch(baseApi + gistId + '/' + lastGistCommitVersion)
        const gistInfoJson = await gistInfo.json()
        const filesNames = gistInfoJson.files || {}
        if (filesNames.length === 0) {
            throw new Error('No files found in this gist')
        }
        lastGistRawUrl = Object.values(filesNames)[0].raw_url
    } catch (error) { console.log(error) }
    let gistContent
    try {
        const gistContentRaw = await fetch(lastGistRawUrl)
        gistContent = await gistContentRaw.text()
    } catch (error) { console.log(error) }
    return gistContent
}

async function loadGeoJsonFromGist() {
    const gistIdFromUrl = new URLSearchParams(window.location.search).get('gistId')
    if (!gistIdFromUrl) return
    const gistContent = await getLatestGistRaw(gistIdFromUrl)
    const geoJson = validateGeoJson(gistContent)
    paintGeoJson(geoJson, waypointsLayer)
    map.addLayer(waypointsLayer)
}

async function loadGeoJsonFromBackend() {
    const query = new URLSearchParams(window.location.search)
    const regionParameter = query.get('regionId') || '2' // default to region 2
    const resourceParameter = query.get('resourceId') || ''
    const enemyParameter = query.get('enemyId') || ''

    if (!resourceParameter && !enemyParameter) return
    if (!regionParameter) return

    if (!/^([1-9])(,([1-9]))*$/.test(regionParameter)) return
    // 1: split, 2: map to number, 3: make number uniques, 4: back to array
    const regionIds = [... new Set(regionParameter.split(',').map(Number))]

    let resourceIds = []
    if (resourceParameter) {
        if (!/^([0-9]\d*)(,([0-9]\d*))*$/.test(resourceParameter)) return
        resourceIds = [... new Set(resourceParameter.split(',').map(Number))]
    }

    let enemyIds = []
    if (enemyParameter) {
        if (!/^([0-9]\d*)(,([0-9]\d*))*$/.test(enemyParameter)) return
        enemyIds = [... new Set(enemyParameter.split(',').map(Number))]
    }

    const fetchPromises = []
    for (const regionId of regionIds) {
        for (const resourceId of resourceIds) {
            fetchPromises.push(
                fetch('https://api.bitcraftmap.com/region' + regionId + '/resource/' + resourceId)
                    .then(response => response.json())
            )
        }
        for (const enemyId of enemyIds) {
            fetchPromises.push(
                fetch('https://api.bitcraftmap.com/region' + regionId + '/enemy/' + enemyId)
                    .then(response => response.json())
            )
        }
    }
    if (fetchPromises.length === 0) return
    const geoJsonResults = await Promise.all(fetchPromises)
    geoJsonResults.forEach(geoJson => {
        if (geoJson.features[0].geometry.coordinates.length > 0) {
            paintGeoJson(geoJson, waypointsLayer)
        }
    })
    map.addLayer(waypointsLayer)
}

async function loadGeoJsonFromFile(fileUrl, layer) {
    const file = await fetch(fileUrl)
    const content = await file.text()
    const geoJson = validateGeoJson(content)
    paintGeoJson(geoJson, layer)
}


function paintGeoJson(geoJson, layer) {
    L.geoJSON(geoJson, {
        pointToLayer: function (feature, latlng) {

            if (feature.properties?.type === 'tooltip') {
                return new L.popup(
                    latlng,
                    { autoPan: false, autoClose: false }
                ).setContent(feature.properties.popupText)
            }

            if (feature.properties?.makeCanvas) {
                if (feature.properties?.radius) {
                    return new L.CircleMarker(latlng, { radius: feature.properties.radius })
                } else {
                    return new L.CircleMarker(latlng, { radius: 1 })
                }
            }

            map.createPane('markerOnTop')
            map.getPane('markerOnTop').style.zIndex = 980

            map.createPane('popupOnTop')
            map.getPane('popupOnTop').style.zIndex = 990


            let waypointIcon
            if (feature.properties?.iconName || feature.properties?.iconSize) {
                waypointIcon = createIcon(feature.properties.iconName, feature.properties.iconSize)
            } else {
                waypointIcon = createIcon('waypoint')
            }

            return L.marker(
                latlng,
                { icon: waypointIcon, pane: 'markerOnTop' }
            )
        },

        style: function (feature) {
            return {
                color: feature.properties?.color || "#3388ff",
                weight: feature.properties?.weight || 3,
                opacity: feature.properties?.opacity || 1,
                fillColor: feature.properties?.fillColor || "#3388ff",
                fillOpacity: feature.properties?.fillOpacity ?? 0.2
            }
        },

        onEachFeature: function (feature, layer) {
            if (feature.properties?.popupText) {
                const popupText = feature.properties.popupText
                let finalPopupText = ''

                if (Array.isArray(popupText)) {
                    for (const line of popupText) {
                        finalPopupText += line + '<br>'
                    }
                } else {
                    finalPopupText = popupText
                }
                layer.bindPopup(finalPopupText, { pane: 'popupOnTop' })
            }

            if (feature.properties?.turnLayerOn) {
                if (Array.isArray(feature.properties.turnLayerOn)) {
                    for (const layerName of feature.properties.turnLayerOn) {
                        const layer = allLayers[layerName]
                        if (layer) map.addLayer(layer)
                    }
                } else {
                    const layer = allLayers[feature.properties.turnLayerOn]
                    if (layer) map.addLayer(layer)
                }
            }

            if (feature.properties?.turnLayerOff) {
                if (Array.isArray(feature.properties.turnLayerOff)) {
                    for (const layerName of feature.properties.turnLayerOff) {
                        const layer = allLayers[layerName]
                        if (layer) map.removeLayer(layer)
                    }
                } else {
                    const layer = allLayers[feature.properties.turnLayerOff]
                    if (layer) map.removeLayer(layer)
                }
            }

            if (
                feature.properties?.flyTo
                && feature.properties?.zoomTo
                && !feature.properties.noPan) {
                map.flyTo(feature.properties.flyTo, feature.properties.zoomTo)
            } else if (
                layer?.getBounds
                && layer?.getBounds().isValid()
                && !feature.properties.noPan) {
                map.fitBounds(layer.getBounds())
            }
        }
    }).addTo(layer)
}

// Default layer to show on map opening
treesLayer.addTo(map)
templesLayer.addTo(map)
ruinedLayer.addTo(map)
searchControl.addTo(map)

const controlLayer = L.control.layers(null, genericToggle, { collapsed: false }).addTo(map)

function groupLayersControl(control, groups) {
    const root = control._overlaysList
    const labels = [...root.querySelectorAll('label')]
    const byName = Object.fromEntries(labels.map(l => [l.textContent.trim(), l]))
    root.innerHTML = ''

    for (const [title, names] of Object.entries(groups)) {
        const section = L.DomUtil.create('details', 'lc-section', root)
        const summary = L.DomUtil.create('summary', 'lc-summary', section)

        // Colapse all but poi
        if (!['Claims', 'Caves', 'Roads'].includes(title)) {
            section.open = true
        }

        // master checkbox
        const master = L.DomUtil.create('input', '', summary)
        master.type = 'checkbox'
        summary.appendChild(document.createTextNode(title))

        const list = L.DomUtil.create('div', 'lc-list', section)
        const children = names.map(n => byName[n]).filter(Boolean)
        children.forEach(el => list.appendChild(el))

        // Select and deselect checkboxes when you click on the master checkbox
        master.addEventListener('change', () => {
            const anyChecked = children.some(el => el.querySelector('input').checked)
            if (anyChecked) {
                // if any child is checked → click all checked ones to deselect
                children.forEach(el => {
                    const cb = el.querySelector('input[type=checkbox]')
                    if (cb.checked) el.click()
                })
            } else {
                // if none checked → click all to select
                children.forEach(el => el.click())
            }
        })

        // keep master synced with children
        children.forEach(el => {
            const cb = el.querySelector('input[type=checkbox]')
            cb.addEventListener('change', () => {
                const all = children.every(c => c.querySelector('input').checked)
                const none = children.every(c => !c.querySelector('input').checked)
                master.indeterminate = !(all || none)
                master.checked = all
            })
        })
    }
}

function escapeHTML(string) {
    return string
        .replace(/&/g, "&amp")
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/"/g, "&quot")
        .replace(/'/g, "&#x27")
}

function validateGeoJson(untrustedString) {

    if (untrustedString.constructor.name !== 'String') {
        throw new Error('untrustedString be a string')
    }

    let decodedString
    try { decodedString = decodeURIComponent(untrustedString) }
    catch { throw new Error('Bad URI encoding') }

    let jsonFormString
    try { jsonFormString = JSON.parse(decodedString) }
    catch { throw new Error('Invalid JSON') }

    if (Array.isArray(jsonFormString)) {
        throw new Error('geoJson must not be an array')
    }

    if (jsonFormString.type !== 'FeatureCollection') {
        throw new Error('geoJson doesnt have FeatureCollection')
    }

    if (!jsonFormString.features || !Array.isArray(jsonFormString.features)) {
        throw new Error('geoJson doesnt have features or features isnt array')
    }

    for (const feature of jsonFormString.features) {

        if (feature.properties?.iconName) {
            // iconName must be a string
            if (feature.properties.iconName.constructor.name !== 'String') {
                feature.properties.iconName = 'waypoint'
            }

            // iconName must be present in the iconsManifest list
            if (feature.properties.iconName in iconsManifest === false) {
                feature.properties.iconName = 'waypoint'
            }
        }

        if (feature.properties?.iconSize) {
            // Check if icon size is an array 
            if (!Array.isArray(feature.properties.iconSize)) {
                feature.properties.iconSize = [32, 32]
            }

            // Icon size need to be an array of length 2
            if (feature.properties.iconSize.length !== 2) {
                feature.properties.iconSize = [32, 32]
            }

            // Check if we have numbers in the array
            if (!feature.properties.iconSize.every(value => value.constructor.name === 'Number')) {
                feature.properties.iconSize = [32, 32]
            }
        }

        if (feature.properties?.popupText) {
            if (
                Array.isArray(feature.properties.popupText)
                && feature.properties.popupText.every(
                    value => value.constructor.name === 'String'
                )
            ) {
                feature.properties.popupText = feature.properties.popupText.map(escapeHTML)
            } else if (feature.properties.popupText.constructor.name === 'String') {
                feature.properties.popupText = escapeHTML(feature.properties.popupText)
            } else {
                throw new Error('popupText must be string or array of strings')
            }
        }
    }
    return jsonFormString
}

// Load files
loadTreesGeoJson()
loadTemplesGeoJson()
loadRuinedGeoJson()
loadCavesGeoJson()
loadClaimsGeoJson()

loadGeoJsonFromFile('assets/markers/dungeons.geojson', dungeonsLayer)

// Load from gist / load from hash
loadGeoJsonFromGist()
loadGeoJsonFromHash()
loadGeoJsonFromBackend()

// Load only when the user is requesting it
gridsLayer.once('add', () => loadGeoJsonFromFile('assets/markers/grids.geojson', gridsLayer))
region1Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r1_small.geojson', region1Roads))
region2Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r2_small.geojson', region2Roads))
region3Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r3_small.geojson', region3Roads))
region4Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r4_small.geojson', region4Roads))
region5Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r5_small.geojson', region5Roads))
region6Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r6_small.geojson', region6Roads))
region7Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r7_small.geojson', region7Roads))
region8Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r8_small.geojson', region8Roads))
region9Roads.once('add', () => loadGeoJsonFromFile('assets/markers/roads_r9_small.geojson', region9Roads))

/* removing this for now, seems unnecessary (spread markers that are too close together)
// Note : don't forget to add back <script src="assets/js/spider.js"></script> if you want this
map.enableAutoSpiderfy({
    precision: 6,
    footSeparation: 32,
    legLength: 1,
    keepSpiderfied: true,
    legOptions: { color: '#fff', weight: 0 }
})
*/

const GROUPS = {
    'Points of Interest': ['Wonders', 'Temples', 'Ruined Cities', 'Banks', 'Markets', 'Waystones', 'Grids', 'Dungeons', 'Waypoints'],
    'Claims': ['Claims T1', 'Claims T2', 'Claims T3', 'Claims T4', 'Claims T5', 'Claims T6', 'Claims T7', 'Claims T8', 'Claims T9', 'Claims T10'],
    'Caves': ['Caves T1', 'Caves T2', 'Caves T3', 'Caves T4', 'Caves T5', 'Caves T6', 'Caves T7', 'Caves T8'],
    'Roads': ['R1 roads', 'R2 roads', 'R3 roads', 'R4 roads', 'R5 roads', 'R6 roads', 'R7 roads', 'R8 roads', 'R9 roads']
}

const _origUpdate = controlLayer._update.bind(controlLayer)
controlLayer._update = function () {
    const prevOpen = {}
    if (this._overlaysList) {
        this._overlaysList
            .querySelectorAll('details.lc-section')
            .forEach(d => {
                const key = d.querySelector('summary')?.textContent.trim()
                if (key) prevOpen[key] = d.open
            })
    }

    _origUpdate()
    groupLayersControl(this, GROUPS)

    this._overlaysList
        .querySelectorAll('details.lc-section')
        .forEach(d => {
            const key = d.querySelector('summary')?.textContent.trim()
            if (key && prevOpen.hasOwnProperty(key)) d.open = prevOpen[key]
        })
}

groupLayersControl(controlLayer, GROUPS)
