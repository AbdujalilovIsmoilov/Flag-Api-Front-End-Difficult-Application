"use strict";

// ****API ALL CODES START****

$(".section__card_container").innerHTML = `
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

const request = async () => {
  const response = await fetch("https://restcountries.com/v2/all");
  const result = await response.json();
  $(".section__card_container").innerHTML = "";
  ApiRender(result)
  $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${result.length} ta`;
}
request();


// ****API ALL CODES END****



// ****API RENDER CODES START****

function ApiRender(data = []) {
  data.forEach(item => {
    const div = creat("div", "section__card_container_box", `
      <img
        class="section__card_container_box-img"
        src="${item.flags?.svg}"
        alt="rasm"
        title="rasm"
      />
      <div class="section__card_container_box_body">
        <h2 class="section__card_container_box_body-title">
          ${item?.name}
        </h2>
        <p class="section__card_container_box_body-text">
          <strong>Population:</strong> ${item?.population}
        </p>
        <p class="section__card_container_box_body-text">
          <strong>Region:</strong> ${item?.region}
        </p>
        <p class="section__card_container_box_body-text">
          <strong>Capital:</strong> ${item?.capital}
        </p>
        <button type="button" class="section__card_container_box_body-btn" data-btn="${item?.area}">
          Information
        </button>
      </div>
    `);
    $(".section__card_container").appendChild(div);
  });


  // ****API MODAL CODES START****

  $(".section__card").addEventListener("click", (e) => {
    if (e.target.classList.contains("section__card_container_box_body-btn")) {
      const id = e.target.getAttribute("data-btn");
      RenderIdData(id);
      if (!$("body").classList.contains("active")) {
        $("body").classList.add("active");
      }
    }
  });

  function RenderIdData(ID) {
    const target = data.filter(item => {
      return item.area == ID;
    });
    target.forEach(item => {
      const {
        flags: { svg }, nativeName, population, region, subregion, capital, currencies, languages, name, topLevelDomain, borders
      } = item;

      const card = creat("div", "wrapper", `
    <button type="button" class="section__modal-btn">
    <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
    </button>
    <div class="section__modal_container">
      <div class="section__modal_container_box">
        <img src="${svg}" alt="rasm" title="rasm"
          class="section__modal_container_box-img" />
      </div>
      <div class="section__modal_container_box">
        <div class="section__modal_container_box_fluid">
          <div class="section__modal_container_box_fluid_small">
            <h2 class="section__modal_container_box_fluid_small-title">
              ${name}
            </h2>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_fluid_box_small_text-span">
                Native Name:
              </span>
              ${nativeName}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Population:
              </span>
              ${population}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Region:
              </span>
              ${region}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_small_text-span">
                Sub Region:
              </span>
              ${subregion}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Capital:
              </span>
              ${capital}
            </p>
          </div>
          <div class="section__modal_container_box_fluid_small">
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Top Level Domain:
              </span>
              ${topLevelDomain}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Currencies:
              </span>
              ${currencies[0]?.name}
            </p>
            <p class="section__modal_container_box_fluid_small_text">
              <span class="section__modal_container_box_fluid_small_text-span">
                Languages:
              </span>
              ${languages[0]?.name}
            </p>
          </div>
        </div>
        <div class="section__modal_container_buttons">
          <h3 class="section__modal_container_buttons-title">
            Border Countries:
          </h3>
          <button class="section__modal_container_buttons-btn" type="button">
            France
          </button>
          <button class="section__modal_container_buttons-btn" type="button">
            Germany
          </button>
          <button class="section__modal_container_buttons-btn" type="button">
            Netherlands
          </button>
        </div>
      </div>
    
    </div>
    `);
      $(".section__modal .container").appendChild(card);
    });

    $(".section__modal-btn").addEventListener("click", () => {
      $(".section__modal .container").innerHTML = "";
      $("body").classList.remove("active");
    });
  }

  // ****API MODAL CODES END****



  // ****API SEARCH CODES START****


  function findFunction(regex) {
    return data.filter(item => {
      return item.name.match(regex);
    });
  }



  $("#search").addEventListener("keyup", (e) => {
    $(".section__card_container").innerHTML = `
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
    const searchValue = e.target.value.trim();
    const regex = new RegExp(searchValue, "gi");
    const renderFindFunction = findFunction(regex);
    setTimeout(() => {
      if (renderFindFunction.length > 0) {
        RenderApiFunction(renderFindFunction);
        $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${renderFindFunction.length} ta`;
      } else {
        $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${renderFindFunction.length} ta`;
        $(".section__card_container").innerHTML = "";
      }
    }, 2000);
  });

  // ****API SEARCH CODES END****


  // ****API SEARCH CODES END****


  function RenderApiFunction(data = []) {

    $(".section__card_container").innerHTML = "";
    data.forEach(item => {
      const div = creat("div", "section__card_container_box", `
      <img
        class="section__card_container_box-img"
        src="${item.flags?.svg}"
        alt="rasm"
        title="rasm"
      />
      <div class="section__card_container_box_body">
        <h2 class="section__card_container_box_body-title">
          ${item?.name}
        </h2>
        <p class="section__card_container_box_body-text">
          <strong>Population:</strong> ${item?.population}
        </p>
        <p class="section__card_container_box_body-text">
          <strong>Region:</strong> ${item?.region}
        </p>
        <p class="section__card_container_box_body-text">
          <strong>Capital:</strong> ${item?.capital}
        </p>
        <button type="button" class="section__card_container_box_body-btn" data-btn="${item?.area}">
          Information
        </button>
      </div>
    `);
      $(".section__card_container").appendChild(div);
    });

  }
  // ****API SEARCH CODES END****

  const array = [];
  data.forEach(item => {
    if (!array.includes(item.region)) {

      array.push(item.region);
    }
  });
  array.sort();
  array.unshift("All");


  array.forEach(item => {
    const option = creat("option", "main__form_select-option", item);

    $(".main__form_select").appendChild(option);
  });


  $(".main__form_select").addEventListener("change",(e)=> {
    sortCountry(e.target.value.toLowerCase());
  });

  async function sortCountry(datas){
    $(".section__card_container").innerHTML = "";
    if(datas == "all"){
      const response = await fetch(`https://restcountries.com/v2/all/`);
      const result = await response.json();
      ApiRender(result);
    }else {
      console.log(false);
    }
  }

}
// ****API RENDER CODES END****


// *****DARK MODE CODES START****

$(".nav__list_item-moon").addEventListener("click", (e) => {
  if ($(".nav__list_item-moon").getAttribute("class") == "nav__list_item-moon fa fa-sun") {
    $("body").classList.add("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-moon");
  } else {
    $("body").classList.remove("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-sun");
  }
});

// *****DARK MODE CODES END****
