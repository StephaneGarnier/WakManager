model.Users.methods.create = function(email, firstname, lastname, password) {
    var user = ds.Users.find('email==:1', email);
    if (user != null) {
        return {
            error: 409,
            errorMessage: "email already exists"
        }
    }

    ds.startTransaction();

    try {
        var user = ds.Users.createEntity();

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
        user.role = "Users";

        user.save();

    }
    catch (e) {

        ds.rollBack();

        return e;

    };

    ds.commit();

    return true;
};

model.Users.methods.create.scope = 'public';

model.Users.methods.changePassword = function(ID, password, guid) {
    var curSession = currentSession();
    var currUser = curSession.user;
    if (ID == currUser.ID) {
        var user = ds.Users.find('ID==:1', ID);
        if (user == null) {
            return {
                error: 409,
                errorMessage: "changing password is prohibited or account doesn't exist"
            }
        }
        else {
            user.password = password;
            user.save();
            return true;
        }

    }
    else {
        var user = ds.Users.find('resetID==:1', guid);
        if (user == null) {
            return {
                error: 409,
                errorMessage: "changing password is prohibited or account doesn't exist"
            }
        }
        else {
            user.password = password;
            user.resetID = "";
            user.save();
            return true;
        }

    }
};

model.Users.methods.changePassword.scope = 'public';


model.Users.methods.edit = function(ID, firstname, lastname, country) {
    var curSession = currentSession();
    var currUser = curSession.user;
    if (ID == currUser.ID) {
        var user = ds.Users.find('ID==:1', ID);
        user.firstname = firstname;
        user.firstname = lastname;
        user.country = country;
        user.save();
        return true;
    }
    else {
        return {
            error: 409,
            errorMessage: "changing profile is prohibited"
        }
    }
};

model.Users.methods.edit.scope = 'public';

sendLostPasswordMail = function (email, resetID) {
	 var mail = require('waf-mail/mail');
        var message = new mail.Mail();
        message.subject = "Recovery password";
        message.from = "wakManager@wakanda.io";
        message.to = [email];
        message.setBody("http://127.0.0.1:8000/app/index.html#/change_password/" + resetID);
        mail.send({
            address: 'smtp.gmail.com',
            port: 465,
            isSSL: true,
            username: 'Username',
            password: 'changePassword',
            domain: 'gmail.com'
        }, message);
}

model.Users.methods.lostPassword = function(email) {
    var user = ds.Users.find('email==:1', email);
    if (user == null) {
        return {
            success: false,
            error: 409,
            errorMessage: "email doesn't' exists"
        }
    }
    else {
        user.resetID = generateUUID();
        user.save()
       	//sendLostPasswordMail(user.email, user.resetID)
        return {
            success: true,
            resetID: user.resetID
        }
    }
};
model.Users.methods.lostPassword.scope = 'public';