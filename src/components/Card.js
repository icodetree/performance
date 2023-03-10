import React, { useEffect, useRef } from 'react'

function Card(props) {
	// 1. 이미지 래퍼런스를 가져온다.
	const imgRef = useRef(null);

	// 1. userEffect 를 사요하지 않으면 랜더링할때마다 인스턴스가 생성되고, 
	// 대상요소를 관찰하게 되면서 대상요소에 여러개의 콜백이 실행된다.
	// 따라서 이와같은 중복을 방지하고자 userEffect에서 인스턴스를 생성해야 한다.
	useEffect(() => {
		const options = {}
		const callback = (entries, observer) => {
			// 2. 화면에 이미지가 보이는 순간, 콜백이 실행되는 순간에 이미지를 로드한다.
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					console.log('is intersecting',entry.target.src);
					entry.target.src = entry.target.src;
					observer.unobserve(entry.target)
				}
			});
		}

		const observer = new IntersectionObserver(callback, options);
		observer.observe(imgRef.current)

		// 1. observer.disconnect 함수를 호출함으로써 리소스가 낭비되지 않도록 한다.
		return () => observer.disconnect()

	}, [])

	return (
		<div className="Card text-center">
			<img src={props.image} ref={imgRef} />
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
