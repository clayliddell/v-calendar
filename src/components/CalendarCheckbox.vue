<script>
export default {
    render(h) {
        return h('div', {
            style: 'width: var(--highlight-height); height: var(--highlight-height);',
        }, [
            h('div', {
                class: ['round-week-selector-button'],
            },
            [
                h('input', {
                    domProps: {
                        checked: (this.selected == this.id),
                    }, attrs: {
                        id: this.id,
                        type: 'checkbox',
                    },
                    on: {
                        click: () => {
                            this.$emit('weekselected', { id: this.id, start: this.firstDayOfWeek, end: this.lastDayOfWeek });
                        },
                    },
                }),
                h('label', {
                    attrs: {
                        for: this.id,
                    },
                }),
            ]),
        ]);
    },
    created() {
        this.id = this.generateRandomID();
    },
    props: {
        selected: String,
        firstDayOfWeek: Date,
        lastDayOfWeek: Date
    },
    data() {
        return {
            id: null,
        }
    },
    methods: {
        generateRandomID() {
            return Math.random().toString(36).substr(2, 9);
        },
    }
}
</script>
<style scoped>
.round-week-selector-button {
  position: relative;
}

.round-week-selector-button label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}

.round-week-selector-button label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round-week-selector-button input[type="checkbox"] {
  visibility: hidden;
}

.round-week-selector-button input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round-week-selector-button input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
</style>