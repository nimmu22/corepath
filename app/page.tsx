{results.length > 0 && (
  <nav className="job-pagination" aria-label="Job result pages">
    <div className="pagination-summary">
      <strong>
        {(currentPage - 1) * 12 + 1}–{Math.min(currentPage * 12, results.length)}
      </strong>
      <span>of {results.length} opportunities</span>
    </div>

    <div className="pagination-controls">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        aria-label="Previous page"
      >
        <span aria-hidden="true">←</span>
        <span>Previous</span>
      </button>

      <div className="pagination-numbers">
        {Array.from({ length: pageCount }, (_, i) => i + 1)
          .filter(
            n =>
              n === 1 ||
              n === pageCount ||
              Math.abs(n - currentPage) <= 1
          )
          .map((n, i, pages) => (
            <span className="pagination-item" key={n}>
              {i > 0 && n - pages[i - 1] > 1 && (
                <span className="pagination-gap" aria-hidden="true">…</span>
              )}
              <button
                className={`pagination-number ${
                  n === currentPage ? "selected" : ""
                }`}
                aria-label={`Page ${n}`}
                aria-current={n === currentPage ? "page" : undefined}
                onClick={() => changePage(n)}
              >
                {n}
              </button>
            </span>
          ))}
      </div>

      <span className="pagination-mobile" role="status">
        {currentPage} / {pageCount}
      </span>

      <button
        className="pagination-arrow"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
        aria-label="Next page"
      >
        <span>Next</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>

    <style jsx>{`
      .job-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
        margin: 28px 0 16px;
        padding: 22px 0;
        border-top: 1px solid rgba(128, 128, 128, 0.2);
      }

      .pagination-summary {
        display: flex;
        align-items: baseline;
        gap: 7px;
        font-size: 13px;
      }

      .pagination-summary strong {
        font-size: 15px;
        font-variant-numeric: tabular-nums;
      }

      .pagination-summary span {
        opacity: 0.65;
      }

      .pagination-controls,
      .pagination-numbers,
      .pagination-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .pagination-arrow,
      .pagination-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        height: 44px;
        border: 1px solid rgba(128, 128, 128, 0.25);
        border-radius: 12px;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition:
          background 160ms ease,
          border-color 160ms ease,
          transform 160ms ease;
      }

      .pagination-arrow {
        gap: 9px;
        padding: 0 15px;
      }

      .pagination-arrow:not(:disabled):hover,
      .pagination-number:not(.selected):hover {
        background: rgba(128, 128, 128, 0.12);
        border-color: rgba(128, 128, 128, 0.5);
        transform: translateY(-1px);
      }

      .pagination-number.selected {
        background: #2563eb;
        color: #fff;
        border-color: #2563eb;
        box-shadow: 0 4px 14px rgba(37, 99, 235, 0.22);
      }

      .pagination-arrow:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      .pagination-arrow:focus-visible,
      .pagination-number:focus-visible {
        outline: 2px solid #60a5fa;
        outline-offset: 3px;
      }

      .pagination-gap {
        padding: 0 5px;
        opacity: 0.5;
      }

      .pagination-mobile {
        display: none;
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }

      @media (max-width: 640px) {
        .job-pagination {
          flex-direction: column;
          gap: 14px;
        }

        .pagination-controls {
          width: 100%;
          justify-content: space-between;
        }

        .pagination-numbers {
          display: none;
        }

        .pagination-mobile {
          display: block;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .pagination-arrow,
        .pagination-number {
          transition: none;
        }
      }
    `}</style>
  </nav>
)}
