import 'lite-youtube-embed';
import BasePage from './base-page';
import Lightbox from 'fslightbox';
window.fslightbox = Lightbox;

class Home extends BasePage {
	onReady() {
		this.initFeaturedTabs();
		this.getCategories();
	}

	/**
	 * used in views/components/home/featured-products-style*.twig
	 */
	initFeaturedTabs() {
		app.all('.tab-trigger', (el) => {
			el.addEventListener('click', ({ currentTarget: btn }) => {
				let id = btn.dataset.componentId;
				// btn.setAttribute('fill', 'solid');
				app
					.toggleClassIf(
						`#${id} .tabs-wrapper>div`,
						'is-active opacity-0 translate-y-3',
						'inactive',
						(tab) => tab.id == btn.dataset.target
					)
					.toggleClassIf(
						`#${id} .tab-trigger`,
						'is-active',
						'inactive',
						(tabBtn) => tabBtn == btn
					);

				// fadeIn active tabe
				setTimeout(
					() =>
						app.toggleClassIf(
							`#${id} .tabs-wrapper>div`,
							'opacity-100 translate-y-0',
							'opacity-0 translate-y-3',
							(tab) => tab.id == btn.dataset.target
						),
					100
				);
			});
		});
		document
			.querySelectorAll('.s-block-tabs')
			.forEach((block) => block.classList.add('tabs-initialized'));
	}

	getCategories() {
		const queryParams = {
			source: 'categories',
		};

		// Call the fetch method
		salla.product
			.fetch(queryParams)
			.then((response) => {
				// Do something with the response data
				console.log(response);
			})
			.catch((error) => {
				// Handle any errors that occur
				console.error(error);
			});
	}
}

Home.initiateWhenReady(['index']);
