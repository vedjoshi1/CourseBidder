const quickemailverification = require('quickemailverification').client('7e03d0feeb3587d2387b1b419092ac3527c7c1bbffab1950a599c7e6ae69').quickemailverification();

function verifyUCLAEmail(email, callback) {
    // Check if the email ends with @g.ucla.edu or @ucla.edu
    if (email.endsWith('@g.ucla.edu') || email.endsWith('@ucla.edu')) {
        // Verify the email using quickemailverification
        quickemailverification.verify(email, function (err, response) {
            if (err) {
                // Handle error
                callback(false);
            } else {
                // Check if the verification result is valid
                const isValid = response.body.result === 'valid';
                callback(isValid);
            }
        });
    } else {
        // Email doesn't match the desired domain, so automatically output false
        callback(false);
    }
}

// Example usage (this should be false)
verifyUCLAEmail("atij@ucla.edu", function (result) {
    console.log(result);
});
