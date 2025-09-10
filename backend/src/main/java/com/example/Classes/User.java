package com.example.Classes;

import com.example.Entity;
import com.example.GeneratedValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
@Document(collection = "Users")

public class User {
    @Id
    @GeneratedValue

    private String _id;  // maps MongoDB ObjectId

    private String name;
    private String phone;
    private String email;

    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

}
