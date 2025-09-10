package com.example.Classes;

import com.example.GeneratedValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

 @Document(collection = "Rentedbooks")

public class RentedBooks {
    @Id
    @GeneratedValue

    private String _id;  // maps MongoDB ObjectId

    private String bookid;
    private String personid;
    private String capacity;
    private Date whenrented;
    private Date expired;


    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public String getBookid() { return bookid; }
    public void setBookid(String bookid) { this.bookid = bookid; }

    public String getPersonid() { return personid; }
    public void setPersonid(String personid) { this.personid = personid; }

    public String getCapacity() { return capacity; }
    public void setCapacity(String capacity) { this.capacity = capacity; }

    public Date getWhenrented() { return whenrented; }
    public void setWhenrented(Date whenrented) { this.whenrented = whenrented; }

    public Date getExpired() { return expired; }
    public void setExpired(Date expired) { this.expired = expired; }

}





