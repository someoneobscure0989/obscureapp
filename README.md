# ObscureApp

Five-star product rating and reviews with real-time update

## Live URLs

https://obscureapp0989.herokuapp.com (redirects to sample product page)

* **Sample product pages**
  * https://obscureapp0989.herokuapp.com/products/sample-product
  * https://obscureapp0989.herokuapp.com/products/second-sample-product
* **Admin interface**
  * https://obscureapp0989.herokuapp.com/admin

## Implementation notes

*ObscureApp* is a Rails 6 app using [webpacker] for bundling, and Action Cable for real-time updates of the reviews and average score.

The MVP version of the frontend is implemented in plain JavaScript ('VanillaJS'), and care was taken to write the star rating in such a way that it could be transformed into a React component easily for v2:
* It's an ES6 class that can be instantiated on any container element in the DOM.
* The data attributes that the ['mounting' code in starrating.js][starrating-mount] passes to the constructor correspond to the props of the later React component.

In the MVP, adding a review to the product takes a full server round-trip: there's a form post, and the server comes back with the server-rendered product view containing the updated review list and average score.

v2 is essentially a React SPA, where the review is posted in the background using the Fetch API, and the product and reviews are retrieved
* either by fetching them from a JSON API endpoint (on initial load)
* or by receiving them through an Action Cable channel.
  
In both cases, Jbuilder is used for generating the JSON.

The [product detail component in v2][product-detail] uses [zustand] as a state-management solution to keep the product and reviews in a store, and trigger a re-render of the component when they are updated in the store. *zustand* was chosen because Redux seemed like overkill. I appreciate *zustand*'s simplicity. It was my first time using it, and I'm a fan now.

Speaking of first times, I also hadn't used Rails before. Perhaps if I had, I would have used Turbolinks to hot-swap some HTML in the MVP implementation, instead of doing the full round-trip. I found Rails a pleasure to work with, and not hard to map to from Django. I particularly appreciated how straightforward it was to implement the real-time updates using Action Cable.

One area where I'd improve the app if I were working on it some more is mobile responsiveness: right now, it's just not responsive, and I only patched on a few media queries and viewport meta parameters to make it baseline usable on a mobile. The star rating widget also doesn't support swiping.


[webpacker]: https://github.com/rails/webpacker
[starrating-mount]: https://github.com/someoneobscure0989/obscureapp/blob/e5be13ad45e1f4e1b9c035466fbe87e38977e33e/app/javascript/packs/starrating.js#L118
[product-detail]: app/javascript/components/ProductDetail/index.jsx
[zustand]: https://github.com/pmndrs/zustand
