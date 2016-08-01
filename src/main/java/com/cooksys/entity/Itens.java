package com.cooksys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "itens")
public class Itens {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "origin")
	private String origin;
	
	@Column(name = "destination")
	private String destination;
	
	@Column(name = "midpoint")
	private String midpoint;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}
	
	public String getMidpoint() {
		return midpoint;
	}

	public void setMidpoint(String midpoint) {
		this.midpoint = midpoint;
	}

	public Itens(long id, String name, String origin, String destination, String midpoint) {
		super();
		this.id = id;
		this.name = name;
		this.origin = origin;
		this.destination = destination;
		this.midpoint = midpoint;
	}

	public Itens() {
		super();
	}
}
