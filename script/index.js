
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    // fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // convert promise to json
        .then((res) => res.json())
        // send data to display 
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res => res.json()))
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        });
}

const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add("active");
            displayVideos(data.category);
        })
}

const loadVideoDetails = (videoID) => {
    console.log(videoID);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.authors[0].profile_name}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    `
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
    <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
        // Append the Element
        categoryContainer.appendChild(categoryDiv);
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex justify-center items-center flex-col text-center">
            <img class="w-[120px]" src="Asset/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
    }

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
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} 
                    ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`: `` }
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>
        `
        // append
        videoContainer.append(videoCard)
    })
}


document.getElementById('search-input').addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
})

loadCategories();
