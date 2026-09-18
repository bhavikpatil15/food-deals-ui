Deal Book

A dynamic discount banner and deals section for a food-delivery app.

The banner is generated from the menu data, not hardcoded. It groups every discounted dish into tiers (50% / 40% / 30%), lists the restaurants that qualify, and rotates through them. Tapping it opens a deals page where items are filtered by category and then grouped under the restaurant that sells them.

Live demo

Open index.html in a browser, or serve it:

bash
python3 -m http.server 8000

Then visit http://localhost:8000

or just visit -   https://bhavikpatil15.github.io/food-deals-ui/

Files
index.html       markup and mount points
css/style.css    coupon-book theme, ticket shape, animations
js/data.js       DISHES array + the off() discount helper
js/app.js        banner rotation, filtering, grouping, price counter
How it works

Everything flows from one array in js/data.js:

js
{ r:"Domino's", rate:4.3, time:"20-25 min", km:2,
  cat:"Pizza", ic:"🍕", n:"Farmhouse Medium", mrp:559, p:279 }
field	meaning
r	restaurant name
cat	food category — drives the tab it lands under
mrp	original price
p	discounted price
ic	emoji placeholder (swap for an image URL)

Discount percent is derived, never stored:

js
const off = d => Math.round((1 - d.p / d.mrp) * 100);

Because of that, adding one dish to DISHES automatically updates the banner tiers, the restaurant list on the ticket, the category tabs, and the grouped sections. No other file needs touching.

Render pipeline
DISHES
  ├─ filter by tier      → banner ticket
  └─ filter by tier
       ├─ filter by category (tabs)
       ├─ filter by price band (filters)
       └─ group by restaurant → rendered sections
Swapping in a real backend

Replace the DISHES constant with a fetch and call render() once it resolves:

js
const DISHES = await fetch('/api/deals').then(r => r.json());

Keep the field names the same and nothing else changes.

Accessibility and motion

Animations are wrapped in a prefers-reduced-motion guard — with it enabled, prices appear at their final value and all transitions are dropped. Focus rings are visible on the banner and every control.

Roadmap
 Replace emoji placeholders with dish photos
 Persist the selected category across navigation
 Add a countdown for time-limited deals
 Wire the cart / add-to-order button
