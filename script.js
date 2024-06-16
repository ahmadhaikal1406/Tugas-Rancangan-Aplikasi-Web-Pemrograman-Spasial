document.addEventListener("DOMContentLoaded", function() {
    // URL tile layer OpenStreetMap
    var openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Initialize the first Leaflet map and set the view
    var map1 = L.map('map1').setView([-7.47, 110.1943], 7); // Set to the center of Java
    L.tileLayer(openStreetMapUrl, {
        maxZoom: 19,
    }).addTo(map1);

    // Array of markers for map1
    var locationsMap1 = [
        { lat: -6.2088, lng: 106.8456, name: 'Jakarta City', description:'Jakarta is the capital of Indonesia which is the center of various activities. Jakarta is famous for its urban area equipped with Betawi culture. Some of the icons of the city of Jakarta are the National Monument, ondel ondel, and kerak telor', img: 'Jakarta.jpg' },
        { lat: -7.7956, lng: 110.3695, name: 'Special Region of Yogyakarta ', description:'Yogyakarta, often abbreviated as Jogja, is a cultural and educational hub in Central Java, Indonesia. Renowned for the Yogyakarta Palace (Keraton Yogyakarta), a grand royal complex, and the stunning Prambanan Temple, the city is also famous for its traditional Javanese cuisine like gudeg (young jackfruit stew) and bakpia (sweet pastry)', img: 'Jogja.jpg' },
        { lat: -7.2504, lng: 112.7688, name: 'Surabaya City', description:'Surabaya is Indonesias second-largest city and a bustling metropolis on the eastern coast of Java Island. Known as the City of Heroes,it played a significant role in Indonesias independence struggle. Surabaya is characterized by its vibrant atmosphere, modern skyline, historical landmarks like the Heroes Monument, and its diverse culinary scene featuring local specialties like rawon (beef soup) and rujak cingur (spicy salad with cow snout)', img: 'Surabaya.jpg' },
        { lat: -6.9175, lng: 107.6191, name: 'Bandung City', description:'Bandung is a city located in the highlands of West Java, Indonesia, known for its cool climate and natural beauty. Its renowned for its art deco architecture, diverse shopping options, and traditional Sundanese cuisine, including snacks and local dishes.', img: 'Bandung.jpg' },
        { lat: -7.5554, lng: 110.8200, name: 'Surakarta City', description:'Surakarta, known as Solo, is a historic city in Central Java, Indonesia, distinguished by its royal heritage. Solo boasts elegant Javanese court culture, exemplified by the Surakarta Hadiningrat Palace, and is celebrated for its traditional arts and crafts, as well as culinary delights such as nasi liwet (rice dish cooked in coconut milk)', img: 'Surakarta.jpg' },
        { lat: -6.9913, lng: 110.4252, name: 'Semarang City', description:'Semarang is a major port city on the north coast of Java Island, Indonesia, rich in Dutch colonial heritage. The city is known for its impressive old architecture, such as Lawang Sewu, and its diverse cuisine including Semarang-style spring rolls (lumpia Semarang) and gimbal tofu (tahu gimbal)', img: 'Semarang.jpg' },
    ];

    // Add custom markers to map1 and create buffers
    locationsMap1.forEach(function(location) {
        var customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<img src="' + location.img + '" alt="' + location.name + '">'
        });

        // Add marker with custom icon and bind popup
        var marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map1)
        .bindPopup('<h3>' + location.name + '</h3>' +
            '<p>' + location.description + '</p>' +
            '<div><img src="' + location.img + '" alt="' + location.name + '" style="max-width: 100%; height: auto;"></div>');

        // Create a Turf.js point
        var point = turf.point([location.lng, location.lat]);

        // Create a buffer around the point
        var buffer = turf.buffer(point, 50, { units: 'kilometers' }); // Adjust buffer radius as needed

        // Convert Turf.js buffer to GeoJSON and add to map as a layer
        L.geoJSON(buffer, {
            style: {
                color: 'green', 
                fillColor: 'green', 
                fillOpacity: 0.2, 
                weight: 2 
            }
        }).addTo(map1);
    });

    // Initialize the second Leaflet map and set the view
    var map2 = L.map('map2').setView([-7.47, 110.1943], 7); 
    L.tileLayer(openStreetMapUrl, {
        maxZoom: 19,
    }).addTo(map2);

   // Array of circle locations for map2
   var circleLocationsMap2 = [
    { center: [-6.2, 106.83], radius: 112600 }, //Jakarta
    { center: [-6.11, 106.17], radius: 14000 }, //Serang 
    { center: [-6.18, 106.60], radius: 47200 }, //Tangerang
    { center: [-6.26, 107.02], radius: 62920 }, //Bekasi
    { center: [-6.40, 106.84], radius: 48000 }, //Depok
    { center: [-6.93, 107.64], radius: 54900 }, //Bandung 
    { center: [-6.61, 106.80], radius: 31800 }, //Bogor 
    { center: [-6.82, 107.14], radius: 10320 }, //Cianjur
    { center: [-7.32, 108.23], radius: 13620 }, //Tasikmalaya
    { center: [-6.73, 108.56], radius: 14400 }, //Cirebon
    { center: [-7.43, 109.25], radius: 6300 }, //Purwokerto
    { center: [-6.86, 109.14], radius: 11160 }, //Tegal
    { center: [-6.88, 109.68], radius: 3900 }, //Pekalongan
    { center: [-6.97, 110.42], radius: 38400 }, //Semarang
    { center: [-7.48, 110.22], radius: 9120 }, //Magelang
    { center: [-7.79, 110.40], radius: 38400 }, //Yogyakarta
    { center: [-7.33, 110.51], radius: 2720 }, //Salatiga
    { center: [-7.72, 110.69], radius: 14760 }, //Klaten
    { center: [-7.55, 110.82], radius: 36720 }, //Surakarta
    { center: [-8.09, 111.99], radius: 13680 }, //Tulungaggung 
    { center: [-7.97, 112.66], radius: 17689 }, //Malang
    { center: [-7.26, 112.79], radius: 72800 }, //Surabaya
    { center: [-8.14, 114.38], radius: 36240 }, //Banyuwangi
    { center: [-7.14, 112.66], radius: 27600 }, //Gresik 

];
// Array of circle colors (could be pre-defined or randomly generated)
var circleColors = 
['red', 'green', 'red', 'red', 'red','red', 'yellow', 'green', 'green', 'green','green', 'green', 'green', 'yellow', 'green','yellow', 'green', 'green', 'yellow', 'green','green', 'red', 'yellow', 'yellow'];

// Add circles to map2
circleLocationsMap2.forEach(function(circle, index) {
    L.circle(circle.center, {
        color: circleColors[index],
        fillColor: circleColors[index],
        fillOpacity: 0.3,
        radius: circle.radius
    }).addTo(map2);
});

    // Initialize the third Leaflet map and set the view
    var map3 = L.map('map3').setView([-7.47, 110.1943], 7); // Set to the center of Java
    L.tileLayer(openStreetMapUrl, {
        maxZoom: 19,
    }).addTo(map3);

    // Array of markers for map3
    var locationsMap3 = [
        { lat: -7.6080038, lng: 110.2043403, name: 'Candi Borobudur',  img: '1.jpg', description:'Borobudur is the largest Buddhist temple in the world, located in Magelang, Central Java. Built in the 9th century, it offers a spectacular view of hundreds of stupas rising to the sky.' },
        { lat: -7.7520364, lng: 110.4913301, name: 'Candi Prambanan',  img: '2.jpg', description:'Prambanan is an impressive Hindu temple complex in Yogyakarta, renowned for its majestic architecture and intricate reliefs depicting the epic stories of Ramayana.' },
        { lat: -8.0580734, lng: 114.2410811, name: 'Kawah Ijen',  img: '3.jpg', description:'Located in Banyuwangi, East Java, Ijen Crater is famous for its sulfuric crater that produces natural blue flames at night, as well as its stunning acidic lake.' },
        { lat: -7.9429902, lng: 112.9534375, name: 'Gunung Bromo',  img: '4.jpg', description:'Mount Bromo is one of Indonesias most iconic volcanoes, situated in Probolinggo, East Java. Its breathtaking landscape includes a vast sea of sand and a picturesque caldera.' },
        { lat: -6.3011895, lng: 106.8884006, name: 'Taman Mini Indonesia Indah (TMII)',  img: '5.jpg', description:'TMII in Jakarta is a cultural park featuring miniature replicas of traditional houses from various regions across Indonesia, offering insights into the countrys diverse cultural heritage.'},
        { lat: -6.7206950, lng: 106.9513851, name: 'Taman Safari',  img: '6.jpg', description:'Located in Bogor, West Java, Taman Safari Indonesia is a wildlife conservation park where visitors can observe various animals in their natural habitats.'},
        { lat: -8.0245262, lng: 110.3297456, name: 'Pantai Parangtritis',  img: '7.jpg', description:'Parangtritis Beach near Yogyakarta is renowned for its mythological significance, powerful waves, and beautiful sunset views.' },
        { lat: -6.9839374, lng: 110.4103270, name: 'Lawang Sewu',  img: '8.jpg', description:'Lawang Sewu in Semarang, Central Java, is a historic landmark known for its Dutch colonial architecture and reputed ghost stories.' },
        { lat: -7.7927256, lng: 110.3659320, name: 'Jalan Malioboro Yogyakarta',  img: '9.jpg', description:'Malioboro Street in Yogyakarta is the citys main shopping street and a bustling center of activity. Its known for its vibrant atmosphere, street vendors selling local handicrafts and souvenirs, and traditional Javanese culture.' },
        { lat: -7.1968841, lng: 109.9039526, name: 'Dieng Plateau',  img: '10.jpg', description:'Dieng Plateau in Wonosobo, Central Java, is known for its ancient temples, volcanic craters, and the multicolored Telaga Warna (Colorful Lake).' }
    ];

    // Add markers to map3
    locationsMap3.forEach(function(location) {
        var customIcon = L.divIcon({
            className: 'custom-colored-marker',
            html: '<div style="background-image: url(' + location.img + '); background-size: cover; width: 25px; height: 25px; border-radius: 50%;"></div>',
            iconSize: [25, 25],
            iconAnchor: [12, 25]
        });
        
    // Create HTML content for the popup
    var popupContent = '<div>' +
    '<h2>' + location.name + '</h2>' +
    '<img src="' + location.img + '" style="max-width: 100%; height: auto;"/>' +
    '<p>' + location.description + '</p>' +
    '</div>';

    // Create marker with custom icon and bind popup
    L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(map3)
        .bindPopup(popupContent); // Bind popup with custom HTML content
});
});

document.getElementById('swipeButton').addEventListener('click', function() {
    var viewportHeight = window.innerHeight;

    window.scrollTo({
        top: viewportHeight,
        behavior: 'smooth'
    });
});
