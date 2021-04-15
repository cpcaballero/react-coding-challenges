import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DiscoverBlock from "../routes/Discover/components/DiscoverBlock/components/DiscoverBlock";
import DiscoverItem from "../routes/Discover/components/DiscoverBlock/components/DiscoverItem";
Enzyme.configure({ adapter: new Adapter() });

describe("DiscoverBlock", () => {
  it("should render a title", () => {
    const sampleText = "test title";
    const noTextWrapper = shallow(
      <DiscoverBlock data={[]} text={sampleText} />
    );
    expect(noTextWrapper.find("h2").text()).toBe(sampleText);
  });
  it("should render an empty h2 title", () => {
    const noTextWrapper = shallow(<DiscoverBlock data={[]} />);
    expect(noTextWrapper.find("h2").text()).toBe("");
  });
  it("should throw when there is no data passed", () => {
    expect(() => shallow(<DiscoverBlock text="New Releases" />)).toThrow();
  });
  it("should not render items when data props is empty", () => {
    const discoverWrapper = shallow(<DiscoverBlock data={[]} />);
    expect(discoverWrapper.find(DiscoverItem).length).toBe(0);
  });
  it("should render data", () => {
    const dummyData = [
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
    ];
    const discoverWrapper = shallow(
      <DiscoverBlock data={dummyData} text="Sample text" />
    );
    expect(discoverWrapper.find(DiscoverItem).length).toBe(dummyData.length);
  });
  it("should render the same image source with the url provided", () => {
    const dummyData = [
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
    ];
    const discoverWrapper = mount(
      <DiscoverBlock data={dummyData} text="Sample text" />
    );

    dummyData.map((dataItem, index) => {
      const item = discoverWrapper.find(DiscoverItem).at(index);
      const divItem = item.find(".discover-item__art").at(0).getDOMNode();
      const computedStyle = getComputedStyle(divItem).getPropertyValue(
        "background-image"
      );
      expect(computedStyle).toBe(`url(${dataItem.images[0].url})`);
    });
  });
  it("should not render if imageKey is different", () => {
    const dummyData = [
      {
        name: "test",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56",
            width: 640,
          },
        ],
      },
    ];
    const discoverWrapper = mount(
      <DiscoverBlock data={dummyData} text="Sample text" imageKey="imgs" />
    );
    expect(discoverWrapper.props().data[0].hasOwnProperty("imgs")).toBe(false);
  });
});
