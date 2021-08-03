const main = document.querySelector("#app");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const span = document.getElementsByTagName("span")[0];

const url = "https://api.imgflip.com/get_memes";

fetch(url)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((res) => {
    const memes = res.data.memes;

    let counter = 0;
    let meme = memes[counter];

    const displayMeme = (meme) => {
      main.innerHTML = null;
      const img = document.createElement("img");
      const memeText = document.createElement("h3");

      memeText.textContent = meme.name;

      img.src = meme.url;
      //   img.style.height = `${meme.height}px`;
      //   img.style.width = `${meme.width}px`;

      img.style.height = "500px";
      img.style.width = "500px";
      main.appendChild(memeText);
      main.appendChild(img);
    };

    span.textContent = counter;
    displayMeme(meme);

    const changeBtnColor = () => {
      prev.style.backgroundColor = counter === 0 ? "#ccc" : "tomato";
      next.style.backgroundColor =
        counter === memes.length - 1 ? "#ccc" : "tomato";
    };
    changeBtnColor();

    next.addEventListener("click", () => {
      counter !== memes.length - 1 && increment(counter);
      meme = memes[counter];
      displayMeme(meme);
      changeBtnColor();
      span.textContent = counter;
    });

    prev.addEventListener("click", () => {
      counter !== 0 && decrement(counter);
      meme = memes[counter];
      displayMeme(meme);
      changeBtnColor();
      span.textContent = counter;
    });
    const increment = (count) => {
      counter = count + 1;
    };
    const decrement = (count) => {
      counter = count - 1;
    };
  })
  .catch((err) => {
    main.innerHTML =
      '<p style="color: white">There has been an error with the fetch operation</p>';
    console.error("There has been an error with the fetch operation", err);
  });
