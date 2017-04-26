
class Patterns {
    patternPagination = `<nav class="col-md-6 col-md-offset-4" aria-label="Page navigation">
                            <ul class="pagination">
                              {{#each el}}
                                  <li><a href="#" {{{ariaLabel}}}>{{{num}}}</a></li>
                              {{/each}}
                            </ul>
                        </nav>`;

    patternList = 'empty';
}


export { Patterns }