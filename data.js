const DISHES=[
 {r:"MOJO Pizza",rate:4.6,time:"25-30 min",km:1,cat:"Pizza",ic:"🍕",n:"Veggies Volcano Pizza",mrp:840,p:420},
 {r:"MOJO Pizza",rate:4.6,time:"25-30 min",km:1,cat:"Pizza",ic:"🍕",n:"Tandoori Paneer Pizza",mrp:930,p:465},
 {r:"Domino's",rate:4.3,time:"20-25 min",km:2,cat:"Pizza",ic:"🍕",n:"Farmhouse Medium",mrp:559,p:279},
 {r:"Domino's",rate:4.3,time:"20-25 min",km:2,cat:"Pizza",ic:"🥖",n:"Garlic Breadsticks",mrp:169,p:99},
 {r:"LeanCrust Pizza",rate:4.4,time:"25-30 min",km:1,cat:"Pizza",ic:"🍕",n:"Planet Green Pizza",mrp:858,p:429},
 {r:"Behrouz Biryani",rate:4.2,time:"30-35 min",km:3,cat:"Biryani",ic:"🍚",n:"Hyderabadi Chicken Biryani",mrp:499,p:249},
 {r:"NH1 Bowls",rate:4.5,time:"25-30 min",km:1,cat:"Biryani",ic:"🍛",n:"Chola Chawal Mini Bowl",mrp:248,p:124},
 {r:"GharSe",rate:4.5,time:"20-25 min",km:1,cat:"Homestyle",ic:"🍛",n:"Dal + Rice Thali",mrp:278,p:119},
 {r:"Subway",rate:4.0,time:"25-30 min",km:2,cat:"Burger",ic:"🥪",n:"Veg Delite Sub",mrp:299,p:179},
 {r:"Burger King",rate:4.1,time:"20-25 min",km:2,cat:"Burger",ic:"🍔",n:"Crispy Veg Burger",mrp:129,p:64},
 {r:"Theobroma",rate:4.0,time:"50-55 min",km:4,cat:"Cake",ic:"🍰",n:"Dutch Truffle Pastry",mrp:180,p:90},
];
const off = d => Math.round((1 - d.p / d.mrp) * 100);
