// format address from different fields
const addressBuilder = (building, street, boro, zipcode) => {

    return `${building} ${street}, ${boroBuilder(boro)}, NY ${zipcode}`;

};
// format Boro name, I noticed that In the mockup show New York, but te data saids Manhattan
const boroBuilder = (boro) => {
    return boro.toUpperCase() == 'MANHATTAN' ? 'New York' : boro;
};
// format phone (xxx) xxx-xxxx
const phoneBuilder = (phone) => {
    let newPhone = 'N/A';

    if (phone) {
        //stackoverflow trick
        let ok = phone.search(/^\(?\d{3}\D*\d{3}\D*\d{4}$/);
        if (ok == 0) {
            let parts = phone.match(/^\(?(\d{3})\D*(\d{3})\D*(\d{4})$/);
            newPhone = `(${parts[1]}) ${parts[2]}-${parts[3]}`;
        } else {
            newPhone = phone;
        }
    }
    return newPhone;
};
// format Grade from data which has more than the ABC and GP 
const gradeBuilder = (grade) => {
    const validGrade = ["A", "B", "C"];
    return validGrade.includes(grade) ? grade.toLowerCase() : 'GP';
};
// Convert the gradeDate to date type so I can 
const gradeDateBuilder = (gradeDate) => {
    let newGradeDate = 'N/A';
    if (gradeDate) {
        let date = new Date(gradeDate);
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        newGradeDate = date.toLocaleString('en-us', options).replace(/\//g, " . ");
    }

    return newGradeDate;

};

const inspectionsBuilder = (inspections) => {
    if (inspections.length === 0) {
        return inspectionBuilder(null, null);

    } else if (inspections.length === 1) {
        return inspectionBuilder(inspections[0], inspections[0]);
    } else {
        // implement sort inspections decreasing 
        let sorted = inspections.sort(function (a, b) {
            var c = new Date(a.grade_date);
            var d = new Date(b.grade_date);
            return d - c; //latest first
        });
        return inspectionBuilder(sorted[0], sorted[sorted.length - 1]);
    }
};
// format description that some times come with weird characters.
const inspectionDescriptionDecode = (string) =>{
    return decodeURIComponent(escape(string));
};
// built a smaller version of the inspection.
const inspectionBuilder = (inspection, firstInspection) => {
    const na = 'N/A';
    const grade_date = inspection ? gradeDateBuilder(inspection.grade_date) : na;
    const grade_date_first = firstInspection ? gradeDateBuilder(firstInspection.grade_date) : na;
    return {
        grade_date: grade_date,
        grade_date_first: grade_date_first == na ? grade_date : grade_date_first,
        action: inspection ? (inspection.action ? inspection.action : na) : na,
        violation_code: inspection ? (inspection.violation_code ? inspection.violation_code : na) : na,
        violation_desc: inspection ? (inspection.violation_desc ? inspectionDescriptionDecode(inspection.violation_desc) : na) : na,
        score: inspection ? (inspection.score ? inspection.score : na) : na,
        grade: inspection ? gradeBuilder(inspection.grade) : 'GP',
        inspection_type: inspection ? (inspection.inspection_type ? inspection.inspection_type : na) : na
    };
};
module.exports = {
    addressBuilder: addressBuilder,
    phoneBuilder: phoneBuilder,
    gradeBuilder: gradeBuilder,
    gradeDateBuilder: gradeDateBuilder,
    inspectionsBuilder: inspectionsBuilder
};