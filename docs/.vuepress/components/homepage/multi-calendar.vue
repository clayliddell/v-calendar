<template>
  <div class="section">
    <h2 class="h2">Multi-Paned Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">Responsive multi-row and column layouts</p>
    <div class="flex justify-center">
      	<v-calendar ref="cal" :attributes="highlights" :rows="2" :columns="$screens({ default: 1, lg: 2 })" week-selector v-on:weekselected="addWeek($event)"/>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			highlights: [
		        {
					highlight: 'blue',
					contentStyle: {
						color: 'white',
					},
					dates: [
			            {
			              start: new Date(2019, 7, 10),
			              end: new Date(2019, 7, 12),
			            },
					],
		        }
	        ],
	    }
	},
	methods: {
		addWeek(week) {
			let oldLength = this.highlights[0].dates.length
			let newDates = this.highlights[0].dates.filter(date => (date.start !== week.start))
			let newLength = newDates.length
			
			if (newLength == oldLength) {
				this.highlights[0].dates.push(week)
			} else {
				this.highlights[0].dates = newDates
			}

			this.$refs.cal.refreshAttr(this.highlights)
		}
	}
}
</script>
    