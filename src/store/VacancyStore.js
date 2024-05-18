import {makeAutoObservable} from "mobx";

export default class VacancyStore {
    constructor() {
        this._employmentTypes = []
        this._locations = []
        this._vacancies = []
        this._selectedLocation = {}
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setEmploymentTypes(employmentTypes){
        this._employmentTypes = employmentTypes
    }
    setLocations(locations){
        this._locations = locations
    }

    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedLocation(location){
        this.setPage(1)
        this._selectedLocation = location
    }

    clearSelectedLocation() {
        this._selectedLocation = {}; // Возвращаемся к начальному значению
    }

    clearSelectedType() {
        this._selectedType = {}; // Возвращаемся к начальному значению
    }

    setVacancies(vacancies){
        this._vacancies = vacancies
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }

    setLimit(limit){
        this._limit = limit
    }

    get EmploymentTypes(){
        return this._employmentTypes
    }

    get Locations(){
        return this._locations
    }

    get selectedLocation(){
        return this._selectedLocation
    }

    get Vacancies(){
        return this._vacancies
    }

    get selectedType(){
        return this._selectedType
    }

    get totalCount(){
        return this._totalCount
    }

    get page(){
        return this._page
    }

    get limit(){
        return this._limit
    }

}