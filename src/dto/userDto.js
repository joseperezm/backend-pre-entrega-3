function createUserDto(user) {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    };
}

module.exports = createUserDto;