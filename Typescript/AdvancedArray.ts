export class AdvancedArray extends Array {
    constructor(value: any[]|number) {
        super(typeof(value) === "number" ? value : 0);
        if (value instanceof Array) {
            Array.prototype.push.call(this, ...value)
        } else if (typeof(value) !== "number") throw new Error("Your value is not a Array or Number value");
    }

    // Private Method
    #analysisOfObject(obj1: any, obj2: any): boolean {
        const objKey1 = Object.keys(obj1);
        const objKey2 = Object.keys(obj2);
        if (objKey1.length !== objKey2.length) return false;
        
        for(const key of objKey1) {
            if (obj1[key] instanceof Array && obj2[key] instanceof Array) return this.#analysisOfArray(obj1[key], obj2[key]);
            else if (obj1[key] instanceof Object && obj2[key] instanceof Object) return this.#analysisOfObject(obj1[key], obj2[key]);
            else if (obj1[key] !== obj2[key]) return false;
        }
        return true;
    }
    #analysisOfArray(arr1: any[], arr2: any[]): boolean {
        if (arr1.length !== arr2.length) return false;
        
         for(let i = 0; i < arr1.length; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) return this.#analysisOfArray(arr1[i], arr2[i]);
            else if (arr1[i] instanceof Object && arr2[i] instanceof Object) return this.#analysisOfObject(arr1[i], arr2[i]);
            else if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    // Public Method
    /**
     * Replace an array
     * @param array the replacement array
     */
    replaceArray(array: any[]) {
        Array.prototype.splice.call(this, 0, this.length, ...array);
        return this;
    }
    
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate, if the recursive option is enalbe it will search the element in all arrays of an array.
     * 
     * @param search The element to search for.
     * @param option Different search options
     */
    includes(search: any, option?: number|{recurive?: boolean, start?: number, end?: number}): boolean {    
        if (!option) option = {recurive: false, start: 0, end: this.length};
        else if (!(option instanceof Number)) {
            if (typeof((option as any).recurive) !== "boolean") (option as any).recurive = false;;
            if (typeof((option as any).start) !== "number") (option as any).start = 0;
            if (typeof((option as any).end) !== "number") (option as any).end = this.length;
        }
        const loop: any = (arr: any[]) => {
            for (const a of arr) {
                if (a === search) return true;
                else if (a instanceof Array) {
                    if (search instanceof Array && this.#analysisOfArray(search, a)) return true;
                    else if (typeof(option) === "object" && (option as any).recurive) return loop(a);
                } else if (a instanceof Object && search instanceof Object && this.#analysisOfObject(search, a)) return true;
            }
            return false;
        }
        return loop(typeof(option) === "object" ? this.slice((option as any).start, (option as any).end) : this);
    }
    indexOf(searchElement: any, fromIndex?: number): number {
        let int = -1;
        const loop: any = (arr: any[]) => {
            for (let i = 0; i < arr.length; i++) {
                if (int != -1) break;
                const a = arr[i];
                if (a === searchElement) int = i;
                else if (a instanceof Array) {
                    if (searchElement instanceof Array && this.#analysisOfArray(searchElement, a)) int = i;
                } else if (a instanceof Object && searchElement instanceof Object && this.#analysisOfObject(searchElement, a)) int = i;
            }
        }
        if (fromIndex) loop(this.slice(fromIndex));
        else loop(this);
        if (fromIndex && fromIndex < 0 && this.length != -1) int += (this.length + (fromIndex < -this.length ? -this.length : fromIndex));
        return int;
    }
    lastIndexOf(searchElement: any, fromIndex?: number): number {
        let int = -1;
        const loop: any = (arr: any[]) => {
            for (let i = arr.length-1; i > -1; i--) {
                if (int != -1) break;
                const a = arr[i];
                if (a === searchElement) int = i;
                else if (a instanceof Array) {
                    if (searchElement instanceof Array && this.#analysisOfArray(searchElement, a)) int = i;
                } else if (a instanceof Object && searchElement instanceof Object && this.#analysisOfObject(searchElement, a)) int = i;
            }
        }
        if (fromIndex) loop(this.slice(fromIndex));
        else loop(this);
        if (fromIndex && fromIndex < 0 && this.length != -1) int += (this.length + (fromIndex < -this.length ? -this.length : fromIndex));
        return int;
    }
    /**
     * Returns an new array.
     */
    clone(): AdvancedArray {
        return new AdvancedArray([...this]);
    }

    /**
     * Removes all elements from an array, if the recursive option is enalbe it will remove the element in all arrays of an array
     * @param value Removes all elements from an array 
     * @param recurive enable or disable the recurive option
     */
    spliceAll(value: any, recurive: boolean = false): any[] {    
        const newArray: any[] = [];
        const loop: any = (arr: any[], array: any[]) => {
            for (const a of arr) {
                let booleanValue = false;
                if (a === value) booleanValue = true;
                else if (a instanceof Array) {
                    if (value instanceof Array && this.#analysisOfArray(value, a)) booleanValue = true;
                    else if (recurive) {
                        const number = array.push([])
                        loop(a, array[number-1]);
                    }
                } else if (a instanceof Object && value instanceof Object && this.#analysisOfObject(value, a)) booleanValue = true;
                if (!booleanValue) {
                    if (recurive) {
                        if (!(a instanceof Array)) array.push(a); 
                    } else array.push(a);
                }
            }
        }
        loop(this, newArray);
        this.replaceArray(newArray);
        return this;
    }

    /**
     * get the random elements in an array.
     */
    random(): any {
        return this[Math.floor(Math.random() * this.length)];
    }
}
