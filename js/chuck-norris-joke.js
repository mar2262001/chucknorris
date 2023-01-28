class ChuckNorrisJoke extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    disconnectedCallback() {
        this.remove();
    }

    connectedCallback() {
        this.mapComponentAttributes();
        this.render();
        this.initComponent();

        fetch(`https://api.chucknorris.io/jokes/random`)
                .then(response => response.json())
                .then(responseJson => {
                    this.$tag.querySelector('span').textContent = responseJson.value;
        });

        this.$table.appendChild(this.$tag);
    }

    render() {
        this.shadowDOM.innerHTML = `
            ${this.template()}
        `;
    }

    initComponent() {
        this.$tag = this.shadowDOM.querySelector('.tag');
        this.$table = document.querySelector('.row');
    }

    template() {
        return `
            <div class="tag col s12 card-panel teal lighten-2">
                <span class="card-title" id="${this.attributes.id.value}"></span>
            </div>
        `;
    }

    mapComponentAttributes() {
        const attributesMapping = [
            'id',
        ];
        attributesMapping.forEach(key => {
            if (!this.attributes[key]) {
                this.attributes[key] = {value: ''};
            }
        });
    }
}

export default ChuckNorrisJoke;
