const saveBtn = document.getElementById("input-button");
const inpFld = document.getElementById("input-element");
const ul = document.getElementById("ul-element");
const deleteBtn = document.getElementById("delete-element");
const saveTab = document.getElementById("save-tab");
let bookMarks = [];

const bookmarksFromLocalStorage = JSON.parse(localStorage.getItem("bookMarks"));

if (bookmarksFromLocalStorage) {
  bookMarks = bookmarksFromLocalStorage;
  render(bookMarks);
}

// console.log(bookmarksFromLocalStorage);

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    bookMarks.push(tabs[0].url);
    // console.log(tabs[0].url);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    render(bookMarks);
  });
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  bookMarks = [];
  render(bookMarks);
});

saveBtn.addEventListener("click", function () {
  bookMarks.push(inpFld.value);
  inpFld.value = "";
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  render(bookMarks);
  // console.log(localStorage.getItem("bookMarks"))
});

function render(data) {
  let list = "";
  for (let i = 0; i < data.length; i++) {
    // list += "<li><a href='" + myLeads[i] + "' target='_blank'>"+ myLeads[i] + "</a></li>";
    list += `
    <li>
      <a href='${data[i]}' target='_blank'>${data[i]}
        </a>
    </li>`;
  }
  ul.innerHTML = list;
}

// let render = () => {
//   let list = "";
//   for (let i = 0; i < myLeads.length; i++) {
//     //     list += "<li><a href='" + myLeads[i] + "' target='_blank'>"+ myLeads[i] + "</a></li>";
//     list += `
//     <li>
//       <a href='${myLeads[i]}' target='_balnk'>${myLeads[i]}</a>
//     </li>
//     `;
//   }
//   ul.innerHTML = list;
// };
