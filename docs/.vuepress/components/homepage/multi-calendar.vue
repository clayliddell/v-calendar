<template>
  <div class="section">
    <h2 class="h2">Multi-Paned Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">Responsive multi-row and column layouts</p>
    <div class="flex justify-center">
      	<v-calendar
			ref="cal"
			:attributes="highlights"
			:rows="2"
			:columns="$screens({ default: 1, lg: 2 })"
			week-selector
			single-week-selector
			v-on:weekselected="addWeek($event)"
			:min-date="dateRange.start"
			:max-date="dateRange.end"
		/>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
        	dateRange: {
                start: null,
                end: null,
        	},
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
    mounted() {
        this.setAvailableDateRange()
    },
	methods: {
        setAvailableDateRange() {
            const curr = new Date
            const last = new Date
            const two_years_later = new Date(last.setFullYear(last.getFullYear() + 2))
            this.dateRange.start = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7)) // Get first day of next week
            this.dateRange.end = new Date(last.setDate(two_years_later.getDate() - two_years_later.getDay() - 1)) // Get last day of previous week
        },
		addWeek(week) {
			if (JSON.stringify(this.highlights[0].dates[0]) == JSON.stringify(week)) {
				this.highlights[0].dates = []
			} else {
				this.highlights[0].dates[0] = week
			}

			this.$refs.cal.refreshAttr(this.highlights)
		}
	}
}
</script>
    