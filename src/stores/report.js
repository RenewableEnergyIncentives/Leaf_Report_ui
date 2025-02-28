// stores/reportStore.js
import { defineStore } from 'pinia'
import { data } from '@/data'
import { formatDate } from '@/utils'

export const useReportStore = defineStore('report', {
  state: () => ({
    report: null, // This will hold the full report report
  }),
  actions: {
    // Action to set the report report
    setReport(data) {
      if (!data) return
      this.report = data
    },
  },
  getters: {
    getFilename(state) {
      return state.report ? state.report.report_info['filename']?.slice(0, -5) : null
    },
    getReportId(state) {
      return state.report ? state.report.report_info['report_id'] : null
    },
    getReportDate(state) {
      return state.report ? formatDate(state.report.report_info['report_date']) : null
    },

    get3_12(state) {
      return state.report ? state.report['3_12'] : null
    },
    get19_29(state) {
      return state.report ? state.report['19_29'] : null
    },
    get31_41(state) {
      return state.report ? state.report['31_41'] : null
    },
    get43_53(state) {
      return state.report ? state.report['43_53'] : null
    },
    get55_59(state) {
      return state.report ? state.report['55_59'] : null
    },
    get61_65(state) {
      return state.report ? state.report['61_65'] : null
    },
    get67_71(state) {
      return state.report ? state.report['67_71'] : null
    },
    get73_78(state) {
      return state.report ? state.report['73_78'] : null
    },
    get_primary_cooling_ac(state) {
      return state.report ? state.report['primary_cooling_ac'] : null
    },
    get_secondary_cooling_ac(state) {
      return state.report ? state.report['secondary_cooling_ac'] : null
    },
    get_primary_heating_source(state) {
      return state.report ? state.report['primary_heating_Source'] : null
    },
    get_secondary_heating_source(state) {
      return state.report ? state.report['secondary_heating_Source'] : null
    },
    get_windows(state) {
      return state.report ? state.report['windows'] : null
    },
    get_doors(state) {
      return state.report ? state.report['doors'] : null
    },
    get_range_stoves(state) {
      return state.report ? state.report['range_stove'] : null
    },
    get_cloths_dryer(state) {
      return state.report ? state.report['cloths_dryer'] : null
    },
    get_water_heater(state) {
      return state.report ? state.report['water_heater'] : null
    },
    get_ceiling_insulation(state) {
      return state.report ? state.report['ceiling_insulation'] : null
    },
    get_wall_insulation(state) {
      return state.report ? state.report['wall_insulation'] : null
    },
    get_floor_insulation(state) {
      return state.report ? state.report['floor_insulation'] : null
    },
  },
})

// issue in windows/doors in complete seperation
// Need to discuss % issue
// need to tell about address cells
// Discuss about the report name
// 123.65655.John
// 123.65655.John.01
// 123.65655.John.02
// 123.65655.John.03
