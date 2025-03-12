function loadCategories() {
    // fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // convert promise to json
        .then((res) => res.json())
        // send data to display 
        .then((data) => displayCategories(data.categories));
}



// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }



function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res => res.json()))
        .then((data) => displayVideos(data.videos));
}

function displayCategories(categories) {
    // get the container
    const categoryContainer = document.getElementById("category-container");

    // loop operation on Array of object
    for (let cat of categories) {
        // console.log(cat)

        // create element 
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
        // Append the Element
        categoryContainer.appendChild(categoryDiv);
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videos.forEach(video => {
        console.log(video);

        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">Midnight Sere nade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""> </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
          </div>
        `
        // append
        videoContainer.append(videoCard)
    })
}

loadCategories();
loadVideos();