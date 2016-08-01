package com.cooksys.repository;

public class ItenReq {

	String name;
	String origin;
	String destination;
	String midpoint;

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

	public ItenReq(String name, String origin, String destination, String midpoint) {
		super();
		this.name = name;
		this.origin = origin;
		this.destination = destination;
		this.midpoint = midpoint;
	}

	public ItenReq() {
		super();
	}

}
