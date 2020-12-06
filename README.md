# Dynamic table

Dynamic tables enables the user to append rows for purchase of sale transactions. Also, it calculates voucher's total payment.

## Change Log

### **Version 1.0.0**

### **Version 1.1.0**

- Dropped `jQuery`
- Updated `Bootstrap` to `v5.4`
- Updated `Font Awesome` to `v5.14`
- Added Voucher `discount` and `tax`
- Updated UI elements' style

### **Version 1.2.0**

- New ADD ROW button apart from the table
- Updated UI elements' style
- Code optimizations

### **Version 1.3.0**
- Dynamic generation of table rows when `DOMContentLoaded`
- Event handling optimizations
- UI & UX improvements
- Added `INITIAL_TABLE_ROWS` constant in `app.js`
```JavaScript
const INITIAL_TABLE_ROWS = 5;
```