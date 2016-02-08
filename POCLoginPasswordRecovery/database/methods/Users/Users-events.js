model.Users.fullname.onGet = function() {
	return this.firstname + " " + this.lastname;
};
