const bcrypt = require('bcryptjs');
const assert = require('assert');

describe('Auth Test', async () => {
    const password = "pass123";
    const salt = await bcrypt.genSalt(10);

    it('Password is correct', async () => {
        const encryptedPassword = await bcrypt.hash(password, salt);
        const isMatch = await bcrypt.compare(password, encryptedPassword);
        assert(isMatch);
    });

    it('Password is incorrect', async () => {
        const encryptedPassword = await bcrypt.hash(password, salt);
        const isMatch = await bcrypt.compare("password", encryptedPassword);
        assert(!isMatch);
    });
});