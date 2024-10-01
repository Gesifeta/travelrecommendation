const data = {
    "countries": [
        {
            "id": 1,
            "name": "Australia",
            "cities": [
                {
                    "name": "Sydney, Australia",
                    "imageUrl": "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3lkbmV5JTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
                    "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
                },
                {
                    "name": "Melbourne, Australia",
                    "imageUrl": "https://cdn.pixabay.com/photo/2017/11/29/14/54/melbourne-2986345_640.jpg",
                    "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
                }
            ]
        },
        {
            "id": 2,
            "name": "Japan",
            "cities": [
                {
                    "name": "Tokyo, Japan",
                    "imageUrl": "https://media.istockphoto.com/id/904453184/photo/composite-image-of-mt-fuji-and-tokyo-skyline.jpg?b=1&s=612x612&w=0&k=20&c=tjQ_IG4xMOgrNfvOoigLe8AMkwMYhIE3ab4e5UDT_eg=",
                    "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
                },
                {
                    "name": "Kyoto, Japan",
                    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyd0UxYaX_wvTc8N38uiSHvvVdjM4j9GddQ&s",
                    "description": "Known for its historic temples, gardens, and traditional tea houses."
                }
            ]
        },
        {
            "id": 3,
            "name": "Brazil",
            "cities": [
                {
                    "name": "Rio de Janeiro, Brazil",
                    "imageUrl": "https://images.pexels.com/photos/1804177/pexels-photo-1804177.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
                },
                {
                    "name": "São Paulo, Brazil",
                    "imageUrl": "https://cdn.pixabay.com/photo/2022/03/07/17/47/paulista-avenue-7054178_640.jpg",
                    "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
                }
            ]
        }
    ],
    "temples": [
        {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw36Ve5JhK3jmwzxv7A2bDUdic3OatvsYnhw&s",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world."
        },
        {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "https://i.guim.co.uk/img/media/6c36faa8209eb3195c80f7ada81caa4892479b53/0_276_5000_3000/master/5000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a3b106a7cedd8e4db46af4c39b779ea6",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
        }
    ],
    "beaches": [
        {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "https://cdn.pixabay.com/photo/2017/12/16/22/22/bora-bora-3023437_1280.jpg",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
        },
        {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "https://cdn.pixabay.com/photo/2021/02/02/20/40/beach-5975314_640.jpg",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
        }
    ]
}
async function fetchData() {

    let URI = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json"
    const destination = fetch(URI)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching data:', error));

    return await destination;
}

window.addEventListener('load', fetchData);

function selectNavLink(e) {
    console.log("clicked")
    const navLinks = document.querySelectorAll("a")
    navLinks.forEach((link, index) => {
        link.parentNode.classList.remove("active");
    })
    // e.target.partentNode.classList.add("active")
}
function hideSearchBar() {
    const searchBar = document.getElementById("searchBar")
    searchBar.style.display = "none"
}

async function searchDestinations(event) {
    const { countries, temples, beaches } = data;

    let searchString = event.target.value.toLowerCase().trim()
    if (searchString.length < 1) return

    let isCountrySearch = countries.some(country => country.name.toLowerCase().indexOf(searchString) > -1)
    let isTempleSearch = temples.some(temple => temple.name.toLowerCase().indexOf(searchString) > -1)
    let isBeachSearch = beaches.some(beach => beach.name.toLowerCase().indexOf(searchString) > -1)
    if ("beaches".indexOf(searchString) > -1) {
        let beaches = data.beaches.filter(beach => beach)
        return displayCards(beaches, event)
    }
    if ("temples".indexOf(searchString) > -1) {
        let temples = data.temples.filter(temple => temple)
        return displayCards(temples, event)

    }
    if (isCountrySearch) {
        let result = countries.filter(country => country.name.toLowerCase().indexOf(searchString) > -1)

        return displayCards(result, event)
    }
    else if (isTempleSearch) {
        let result = temples.filter(temple => temple.name.toLowerCase().indexOf(searchString) > -1)

        return result.map(temple => displayCards(temple, event)

        )
    }
    else if (isBeachSearch) {
        let result = beaches.filter(beach => beach.name.toLowerCase().indexOf(searchString) > -1)

        return result.map(beach => displayCards(beach, event))
    }

}
function displayAllCountries(event) {

    const { countries } = data;
    displayCards(countries, event)
}
//display cards
function displayCards(searchItem, event) {

    const cardContainer = document.getElementById("app__destination-card-container")
    cardContainer.style.display = "flex"
    cardContainer.innerHTML = ""
    const destinationCard = document.createElement("div")
    cardContainer.addEventListener("mouseleave", (e) => cardContainer.style.display = "none")
    destinationCard.classList.add("app__destination-card")
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("app__destination-card--image")
    const cardImage = document.createElement("img")
    const visit = document.createElement("a")

    visit.setAttribute("target", "_blank")
    visit.setAttribute("rel", "noopener noreferrer")
    visit.classList.add("btn-primary")
    const cardTitle = document.createElement("h2")
    const cardDescription = document.createElement("p")

    if (searchItem?.length >= 1) {
        searchItem?.map((item) => {
            let newVisit = visit.cloneNode(true)
            let newCardImage = cardImage.cloneNode(true)
            let newImageContainer = imageContainer.cloneNode(true)
            let newDestinationCard = destinationCard.cloneNode(true)
            let newCardTitle = cardTitle.cloneNode(true)
            let newCardDescription = cardDescription.cloneNode(true)
            cardContainer.appendChild(newDestinationCard)
            newDestinationCard.appendChild(newImageContainer)
            newImageContainer.appendChild(newCardImage)
            newDestinationCard.appendChild(newCardTitle)
            newDestinationCard.appendChild(newCardDescription)
            newDestinationCard.appendChild(newVisit)

            newCardTitle.textContent = item.name
            newCardDescription.textContent = item.description
            newCardImage.src = item.imageUrl ? item.imageUrl : item.cities[0].imageUrl
            newVisit.href = item.imageUrl ? item.websiteUrl : item.cities[0].imageUrl
            newVisit.textContent = "Visit"
        })
    }

    else {
        let newVisit = visit.cloneNode(true)
        let newCardImage = cardImage.cloneNode(true)
        let newImageContainer = imageContainer.cloneNode(true)
        let newDestinationCard = destinationCard.cloneNode(true)
        let newCardTitle = cardTitle.cloneNode(true)
        let newCardDescription = cardDescription.cloneNode(true)
        cardContainer.appendChild(newDestinationCard)
        newDestinationCard.appendChild(newImageContainer)
        newImageContainer.appendChild(newCardImage)
        newDestinationCard.appendChild(newCardTitle)
        newDestinationCard.appendChild(newCardDescription)
        newDestinationCard.appendChild(newVisit)

        newCardTitle.textContent = searchItem.name
        newCardDescription.textContent = searchItem.description
        newCardImage.src = searchItem.imageUrl ? searchItem.imageUrl : searchItem.cities[0].imageUrl
        newVisit.href = searchItem.imageUrl ? searchItem.websiteUrl : searchItem.cities[0].imageUrl
        newVisit.textContent = "Visit"
    }

    return ;
}