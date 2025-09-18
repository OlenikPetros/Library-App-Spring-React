package com.example.Models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collection = "Books")
public class Book {

    @Id
    private String _id;  // maps MongoDB ObjectId

    private int id;
    private String title;
    private String isbn;
    private int pageCount;
    private int capacity;

    @Field("publishedDate")
    private Date publishedDate;

    private String thumbnailUrl;

    @Field("shortDescription")
    private String shortDescription;

    @Field("longDescription")
    private String longDescription;

    private String status;
    private List<String> authors;
    private List<String> categories;

    // Getters and setters
    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public int getPageCount() { return pageCount; }
    public void setPageCount(int pageCount) { this.pageCount = pageCount; }

    public Date getPublishedDate() { return publishedDate; }
    public void setPublishedDate(Date publishedDate) { this.publishedDate = publishedDate; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getLongDescription() { return longDescription; }
    public void setLongDescription(String longDescription) { this.longDescription = longDescription; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getCapacity() { return capacity; }
    public void setStatus(int capacity) { this.capacity = capacity; }

    public List<String> getAuthors() { return authors; }
    public void setAuthors(List<String> authors) { this.authors = authors; }

    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }

    public List<String> getAuthor() {

        return List.of();
    }
}
