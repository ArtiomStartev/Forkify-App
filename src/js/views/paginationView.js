import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--inline');

      if (!btn) return;
      const { goto } = btn.dataset;

      handler(+goto);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this.#generateMarkupNextBtn(currPage);
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return this.#generateMarkupPrevBtn(currPage);
    }

    // Other page
    if (this._data.page < numPages) {
      return [
        this.#generateMarkupPrevBtn(currPage),
        this.#generateMarkupNextBtn(currPage),
      ].join('');
    }

    // Page 1, and there are NO other pages
    return '';
  }

  #generateMarkupPrevBtn(currPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
    `;
  }

  #generateMarkupNextBtn(currPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currPage + 1
      }">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
