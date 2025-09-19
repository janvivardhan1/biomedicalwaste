//  const wasteSubTypes = {
//       Yellow: ["Human Anatomical Waste", "Soiled Waste", "Expired Medicine"],
//       Red: ["Plastic Waste", "Tubing", "Catheters"],
//       White: ["Sharps Waste", "Needles", "Scalpels"],
//       Blue: ["Glassware", "Broken Glass", "Medicine Vials"]
//     };

//     document.getElementById("wasteType").addEventListener("change", function() {
//       let selectedWaste = this.value;
//       let tbody = document.getElementById("wasteBody");
//       tbody.innerHTML = "";

//       if (selectedWaste && wasteSubTypes[selectedWaste]) {
//         document.getElementById("wasteTable").style.display = "table";
        
//         wasteSubTypes[selectedWaste].forEach(sub => {
//           let row = `<tr>
//                       <td>${selectedWaste}</td>
//                       <td>${sub}</td>
//                       <td><input type="number" min="0" placeholder="Enter grams"></td>
//                     </tr>`;
//           tbody.innerHTML += row;
//         });
//       } else {
//         document.getElementById("wasteTable").style.display = "none";
//       }
//     });

//     function generateQRCode() {
//       let rows = document.querySelectorAll("#wasteBody tr");
//       let wasteData = [];

//       rows.forEach(row => {
//         let wasteType = row.cells[0].innerText;
//         let subType = row.cells[1].innerText;
//         let qty = row.cells[2].querySelector("input").value || "0";
//         wasteData.push({ wasteType, subType, qty });
//       });

//       document.getElementById("qrcode").innerHTML = "";
//       new QRCode(document.getElementById("qrcode"), {
//         text: JSON.stringify(wasteData, null, 2),
//         width: 200,
//         height: 200
//       });
//     }

     const subCategories = {
      yellow: ["Human Anatomical Waste", "Soiled Waste", "Expired Medicine","Chemical Solid Waste","Chemical Liquid Waste","Discarded Linen","Microbiological Waste"],
      red: ["Plastic Waste", "Tubing", "Catheters"],
      white: ["Sharps Waste", "Needles", "Scalpels"],
      blue: ["Glassware", "Broken Glass", "Medicine Vials"]
    };
        const wasteCategory = document.getElementById("wasteCategory");
    const subCategory = document.getElementById("subCategory");

    // Update sub-category when category changes
    wasteCategory.addEventListener("change", function () {
      const selected = this.value;

      // Clear old options
      subCategory.innerHTML = '<option value="">--- Select Sub-Category ---</option>';

      if (subCategories[selected]) {
        subCategories[selected].forEach(item => {
          let option = document.createElement("option");
          option.value = item;
          option.textContent = item;
          subCategory.appendChild(option);
        });
      }
    });

    
  const qrColors = {
    red: "#c71212ff",
    yellow: "#efdb22ff",
    blue: "#100cebe4",
    white: "#000000b9"
  }

  function generateQR(event) {
  if (event) event.preventDefault(); // stops form reload
  const facilityName = document.getElementById("facility-name").value;
  const facilityAddress = document.getElementById("facility-add").value;
  const date = document.getElementById("dateField").value;
  const hcfNumber = document.getElementById("hcf-num").value;
  const wasteCat = document.getElementById("wasteCategory").value;
  const subCat = document.getElementById("subCategory").value;
  const quantity = document.getElementById("wst-qty").value;

  if ( !date || !wasteCat || !subCat || !quantity) {
    alert("Please fill all required fields!");
    return;
  }

  // Keep QR text short
  // const qrData = `Facility:${facilityName}, Address:${facilityAddress}, Date:${date}, HCF:${hcfNumber}, Waste:${wasteCat}, Sub:${subCat}, Qty:${quantity}Kg/Day`;
const qrData = JSON.stringify({
  Facility: facilityName,
  Address: facilityAddress,
  Date: date,
  HCF: hcfNumber,
  Waste: wasteCat,
  SubCategory: subCat,
  Quantity: quantity + " Kg/Day"
});

  // Clear old QR before generating new
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";

  //  color by category
  qrDiv.style.color = qrColors[wasteCat] || "#ffffff";

  // Generate QR with low error correction to allow more data
  new QRCode(qrDiv, {
    text: qrData,
    width: 220,
    height: 220,
    colorDark: qrColors[wasteCat] || "#ffffff",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L   // <--- allows more data
  });
   // Display details on right side (formatted)
  let detailsHTML = 
    `<p><strong>Facility:</strong> ${facilityName}</p>
    <p><strong>Address:</strong> ${facilityAddress}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>HCF No:</strong> ${hcfNumber}</p>
    <p><strong>Waste Category:</strong> ${wasteCat}</p>
    <p><strong>Sub-Category:</strong> ${subCat}</p>
    <p><strong>Quantity:</strong> ${quantity} Kg/Day</p>`;
  document.getElementById("qrdata").innerHTML = detailsHTML;

  // Show bottom message
  document.getElementById("msg").style.display = "block";
}

//download qr code
 function downloadQRCode(){
  let qrDiv=document.getElementById("qrcode");
  let img= qrDiv.querySelector("img") || qrDiv.querySelector("canvas");
   if (!img){
    alert("Please generate a QR Code first!");
    return;
   }

   let link=document.createElement("a");
   link.download = "qrcode.png";

   // If QR is an <img>
  if (img.tagName === "IMG") {
    link.href = img.src;
  } 
  // If QR is a <canvas>
  else {
    link.href = img.toDataURL("image/png");
  }

  link.click();

 }

  // Get today's date
  const today = new Date();

  // Format it as YYYY-MM-DD (required by input[type=date])
  const formattedDate = today.toISOString().split('T')[0];

  // Set the value of the date input field
  document.getElementById("dateField").value = formattedDate;